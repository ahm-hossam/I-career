import { Injectable } from '@nestjs/common';
import { prisma } from '@i-career/database';
import { toPublicUser } from '../common/types/public-user';

@Injectable()
export class UsersService {
  async findAll() {
    const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
    return users.map(toPublicUser);
  }
}
