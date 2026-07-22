import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';

export interface DashboardSessionPayload {
  sub: string;
  email: string;
  name: string;
  role: string;
  kind: 'dashboard';
}

@Injectable()
export class DashboardSessionGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context
      .switchToHttp()
      .getRequest<Request & { dashboardSession?: DashboardSessionPayload }>();
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!token) {
      throw new UnauthorizedException('Missing session token');
    }

    try {
      const payload = await this.jwtService.verifyAsync<DashboardSessionPayload>(token, {
        secret: process.env.AUTH_JWT_SECRET,
      });
      if (payload.kind !== 'dashboard') {
        throw new UnauthorizedException('Invalid session token');
      }
      req.dashboardSession = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired session token');
    }
  }
}
