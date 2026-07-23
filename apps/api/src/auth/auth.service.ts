import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { prisma } from '@i-career/database';
import { trackServerEvent } from '../common/facebook/track-server-event';
import { toPublicUser } from '../common/types/public-user';
import type { LoginDto } from './dto/login.dto';
import type { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  private async signToken(user: {
    id: string;
    email: string;
    role: string;
    firstName: string;
    lastName: string;
  }) {
    return this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      kind: 'user',
    });
  }

  async register(dto: RegisterDto) {
    const existing = await prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) {
      throw new ConflictException('An account with this email already exists');
    }

    let referredByCodeId: string | undefined;
    if (dto.referralCode) {
      const referralCode = await prisma.referralCode.findUnique({
        where: { code: dto.referralCode },
      });
      if (referralCode) {
        referredByCodeId = referralCode.id;
      }
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await prisma.user.create({
      data: {
        email: dto.email,
        passwordHash,
        firstName: dto.firstName,
        lastName: dto.lastName,
        phone: dto.phone,
        nationality: dto.nationality,
        governorate: dto.governorate,
        birthday: new Date(dto.birthday),
        gender: dto.gender,
        studentStatus: dto.studentStatus,
        university: dto.university,
        graduationYear: dto.graduationYear,
        faculty: dto.faculty,
        referredByCodeId,
      },
    });

    if (referredByCodeId) {
      await prisma.referralEvent.create({
        data: { referralCodeId: referredByCodeId, type: 'SIGNUP', userId: user.id },
      });
    }

    void trackServerEvent('CompleteRegistration', { email: user.email, phone: user.phone });

    const token = await this.signToken(user);
    return { user: toPublicUser(user), token };
  }

  async login(dto: LoginDto) {
    const user = await prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = await this.signToken(user);
    return { user: toPublicUser(user), token };
  }
}
