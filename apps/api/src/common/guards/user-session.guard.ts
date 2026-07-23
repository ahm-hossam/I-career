import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';

export interface UserSessionPayload {
  sub: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  kind: 'user';
}

@Injectable()
export class UserSessionGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request & { userSession?: UserSessionPayload }>();
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!token) {
      throw new UnauthorizedException('Missing session token');
    }

    try {
      const payload = await this.jwtService.verifyAsync<UserSessionPayload>(token, {
        secret: process.env.AUTH_JWT_SECRET,
      });
      if (payload.kind !== 'user') {
        throw new UnauthorizedException('Invalid session token');
      }
      req.userSession = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired session token');
    }
  }
}
