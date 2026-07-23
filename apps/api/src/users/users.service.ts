import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '@i-career/database';
import { toPublicUser } from '../common/types/public-user';
import type { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  async findAll() {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      include: { applications: { select: { attendedAt: true } } },
    });
    return users.map(({ applications, ...user }) => ({
      ...toPublicUser(user),
      applicationsCount: applications.length,
      attendedCount: applications.filter((a) => a.attendedAt !== null).length,
    }));
  }

  async findOne(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        applications: {
          include: { program: { select: { id: true, slug: true, title: true } } },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { applications, ...rest } = user;
    return {
      ...toPublicUser(rest),
      applications: applications.map((app) => ({
        id: app.id,
        status: app.status,
        attendedAt: app.attendedAt,
        createdAt: app.createdAt,
        program: app.program,
      })),
    };
  }

  async update(id: string, dto: UpdateUserDto) {
    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('User not found');
    }
    const user = await prisma.user.update({ where: { id }, data: { archived: dto.archived } });
    return toPublicUser(user);
  }

  async remove(id: string) {
    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('User not found');
    }
    await prisma.user.delete({ where: { id } });
    return { message: 'User removed.' };
  }
}
