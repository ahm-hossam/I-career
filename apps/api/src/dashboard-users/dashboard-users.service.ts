import { randomBytes } from 'node:crypto';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { prisma } from '@i-career/database';
import { toPublicDashboardUser } from '../common/types/public-dashboard-user';
import type { CreateDashboardUserDto } from './dto/create-dashboard-user.dto';
import type { UpdateDashboardUserDto } from './dto/update-dashboard-user.dto';

function generatePassword() {
  return randomBytes(9).toString('base64url');
}

@Injectable()
export class DashboardUsersService {
  async findAll() {
    const users = await prisma.dashboardUser.findMany({ orderBy: { createdAt: 'asc' } });
    return users.map(toPublicDashboardUser);
  }

  async create(dto: CreateDashboardUserDto) {
    const existing = await prisma.dashboardUser.findUnique({ where: { email: dto.email } });
    if (existing) {
      throw new ConflictException('An account with this email already exists');
    }

    const password = generatePassword();
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.dashboardUser.create({
      data: { name: dto.name, email: dto.email, role: dto.role as never, passwordHash },
    });

    return { user: toPublicDashboardUser(user), password };
  }

  async update(id: string, dto: UpdateDashboardUserDto) {
    const existing = await prisma.dashboardUser.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('User not found');
    }

    const user = await prisma.dashboardUser.update({
      where: { id },
      data: { name: dto.name, role: dto.role as never, active: dto.active },
    });
    return toPublicDashboardUser(user);
  }

  async resetPassword(id: string) {
    const existing = await prisma.dashboardUser.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('User not found');
    }

    const password = generatePassword();
    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.dashboardUser.update({ where: { id }, data: { passwordHash } });

    return { password };
  }

  async remove(id: string) {
    const existing = await prisma.dashboardUser.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('User not found');
    }
    await prisma.dashboardUser.delete({ where: { id } });
    return { message: 'User removed.' };
  }
}
