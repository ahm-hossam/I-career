import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { prisma } from '@i-career/database';
import { toPublicHubUser } from '../common/types/public-hub-user';
import type { HubLoginDto } from './dto/login.dto';
import type { HubRegisterDto } from './dto/register.dto';

@Injectable()
export class HubAuthService {
  constructor(private readonly jwtService: JwtService) {}

  private async signToken(user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  }) {
    return this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      kind: 'hub',
    });
  }

  async register(dto: HubRegisterDto) {
    const existing = await prisma.hubUser.findUnique({ where: { email: dto.email } });
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
    const user = await prisma.hubUser.create({
      data: {
        email: dto.email,
        passwordHash,
        firstName: dto.firstName,
        lastName: dto.lastName,
        phone: dto.phone,
        governorate: dto.governorate,
        birthday: new Date(dto.birthday),
        gender: dto.gender,
        studentStatus: dto.studentStatus,
        university: dto.university,
        faculty: dto.faculty,
        referredByCodeId,
      },
    });

    if (referredByCodeId) {
      await prisma.referralEvent.create({
        data: { referralCodeId: referredByCodeId, type: 'SIGNUP', hubUserId: user.id },
      });
    }

    const token = await this.signToken(user);
    return { user: toPublicHubUser(user), token };
  }

  async login(dto: HubLoginDto) {
    const user = await prisma.hubUser.findUnique({ where: { email: dto.email } });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = await this.signToken(user);
    return { user: toPublicHubUser(user), token };
  }
}
