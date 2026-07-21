import { randomBytes } from 'node:crypto';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { prisma } from '@i-career/database';
import type { ForgotPasswordDto } from './dto/forgot-password.dto';

@Injectable()
export class PasswordResetRequestsService {
  async create(dto: ForgotPasswordDto) {
    const user = await prisma.user.findUnique({ where: { email: dto.email } });
    if (user) {
      const existingPending = await prisma.passwordResetRequest.findFirst({
        where: { userId: user.id, status: 'PENDING' },
      });
      if (!existingPending) {
        await prisma.passwordResetRequest.create({ data: { userId: user.id } });
      }
    }
    return { message: 'If that email exists, a request has been submitted.' };
  }

  async findPending() {
    const requests = await prisma.passwordResetRequest.findMany({
      where: { status: 'PENDING' },
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { id: true, firstName: true, lastName: true, email: true, phone: true } },
      },
    });
    return requests;
  }

  async resolve(id: string) {
    const request = await prisma.passwordResetRequest.findUnique({ where: { id } });
    if (!request) {
      throw new NotFoundException('Reset request not found');
    }
    if (request.status === 'RESOLVED') {
      throw new ConflictException('Reset request already resolved');
    }

    const newPassword = randomBytes(9).toString('base64url');
    const passwordHash = await bcrypt.hash(newPassword, 10);

    await prisma.$transaction([
      prisma.user.update({ where: { id: request.userId }, data: { passwordHash } }),
      prisma.passwordResetRequest.update({
        where: { id },
        data: { status: 'RESOLVED', resolvedAt: new Date() },
      }),
    ]);

    return { newPassword };
  }
}
