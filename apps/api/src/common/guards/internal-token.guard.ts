import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import type { Request } from 'express';

@Injectable()
export class InternalTokenGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const token = req.headers['x-internal-token'];
    if (!token || token !== process.env.INTERNAL_API_TOKEN) {
      throw new UnauthorizedException('Invalid internal token');
    }
    return true;
  }
}
