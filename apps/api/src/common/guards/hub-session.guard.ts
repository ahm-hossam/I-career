import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';

export interface HubSessionPayload {
  sub: string;
  email: string;
  firstName: string;
  lastName: string;
  kind: 'hub';
}

@Injectable()
export class HubSessionGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request & { hubSession?: HubSessionPayload }>();
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!token) {
      throw new UnauthorizedException('Missing session token');
    }

    try {
      const payload = await this.jwtService.verifyAsync<HubSessionPayload>(token, {
        secret: process.env.AUTH_JWT_SECRET,
      });
      if (payload.kind !== 'hub') {
        throw new UnauthorizedException('Invalid session token');
      }
      req.hubSession = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired session token');
    }
  }
}
