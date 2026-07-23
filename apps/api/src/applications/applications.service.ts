import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '@i-career/database';
import type { ProgramApplication, ReferralCode, User } from '@i-career/database';
import type { UpdateApplicationDto } from './dto/update-application.dto';

type ApplicationWithRelations = ProgramApplication & {
  user: User;
  referralCode: ReferralCode | null;
  program: { id: string; slug: string; title: string };
};

function toApplicationListItem(app: ApplicationWithRelations) {
  return {
    id: app.id,
    status: app.status,
    attendedAt: app.attendedAt,
    createdAt: app.createdAt,
    program: app.program,
    applicant: {
      id: app.user.id,
      firstName: app.user.firstName,
      lastName: app.user.lastName,
      email: app.user.email,
      phone: app.user.phone,
      university: app.user.university,
      faculty: app.user.faculty,
    },
    referral: app.referralCode
      ? { code: app.referralCode.code, label: app.referralCode.label, type: app.referralCode.type }
      : null,
  };
}

const INCLUDE = {
  user: true,
  referralCode: true,
  program: { select: { id: true, slug: true, title: true } },
} as const;

@Injectable()
export class ApplicationsService {
  async findAll() {
    const applications = await prisma.programApplication.findMany({
      include: INCLUDE,
      orderBy: { createdAt: 'desc' },
    });
    return applications.map(toApplicationListItem);
  }

  async update(id: string, dto: UpdateApplicationDto) {
    const existing = await prisma.programApplication.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Application not found');
    }

    const updated = await prisma.programApplication.update({
      where: { id },
      data: {
        status: dto.status as never,
        attendedAt: dto.attended === undefined ? undefined : dto.attended ? new Date() : null,
      },
      include: INCLUDE,
    });
    return toApplicationListItem(updated);
  }
}
