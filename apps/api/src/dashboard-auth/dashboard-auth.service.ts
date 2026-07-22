import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { prisma } from '@i-career/database';
import { toPublicDashboardUser } from '../common/types/public-dashboard-user';
import type { DashboardLoginDto } from './dto/login.dto';

@Injectable()
export class DashboardAuthService {
  constructor(private readonly jwtService: JwtService) {}

  private async signToken(user: { id: string; email: string; name: string; role: string }) {
    return this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      kind: 'dashboard',
    });
  }

  async login(dto: DashboardLoginDto) {
    const user = await prisma.dashboardUser.findUnique({ where: { email: dto.email } });
    if (!user || !user.active) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = await this.signToken(user);
    return { user: toPublicDashboardUser(user), token };
  }
}
