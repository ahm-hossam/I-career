import { randomBytes } from 'node:crypto';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { prisma, type Prisma } from '@i-career/database';
import type { ProgramFunnelSummary } from '@i-career/types';
import { toPublicProgram } from '../common/types/public-program';
import { toPublicProgramApplication } from '../common/types/public-program-application';
import type { ApplyProgramDto } from './dto/apply-program.dto';
import type { CreateProgramDto } from './dto/create-program.dto';
import type { CreateReferralCodeDto } from './dto/create-referral-code.dto';
import type { UpdateApplicantDto } from './dto/update-applicant.dto';
import type { UpdateProgramDto } from './dto/update-program.dto';

const FORM_INCLUDE = { form: { include: { fields: true } } } as const;

@Injectable()
export class ProgramsService {
  async findAll() {
    const programs = await prisma.program.findMany({
      include: FORM_INCLUDE,
      orderBy: { createdAt: 'asc' },
    });
    return programs.map(toPublicProgram);
  }

  async findBySlug(slug: string) {
    const program = await prisma.program.findUnique({ where: { slug }, include: FORM_INCLUDE });
    if (!program) {
      throw new NotFoundException('Program not found');
    }
    const others = await prisma.program.findMany({
      where: { slug: { not: slug } },
      include: FORM_INCLUDE,
      orderBy: { createdAt: 'asc' },
    });
    return { program: toPublicProgram(program), otherPrograms: others.map(toPublicProgram) };
  }

  async apply(slug: string, hubUserId: string, dto: ApplyProgramDto) {
    const program = await prisma.program.findUnique({ where: { slug }, include: FORM_INCLUDE });
    if (!program) {
      throw new NotFoundException('Program not found');
    }

    const existing = await prisma.programApplication.findUnique({
      where: { hubUserId_programId: { hubUserId, programId: program.id } },
    });
    if (existing) {
      throw new ConflictException('You have already applied to this program');
    }

    const answers = dto.answers ?? {};
    if (program.form) {
      for (const field of program.form.fields) {
        if (!field.required) continue;
        const value = answers[field.id];
        const isEmpty =
          value === undefined ||
          value === null ||
          value === '' ||
          (Array.isArray(value) && value.length === 0);
        if (isEmpty) {
          throw new BadRequestException(`"${field.label}" is required`);
        }
      }
    }

    let referralCodeId: string | undefined;
    if (dto.referralCode) {
      const referralCode = await prisma.referralCode.findUnique({
        where: { code: dto.referralCode },
      });
      if (referralCode && referralCode.programId === program.id) {
        referralCodeId = referralCode.id;
      }
    }

    const application = await prisma.programApplication.create({
      data: {
        hubUserId,
        programId: program.id,
        answers: dto.answers ? (dto.answers as unknown as Prisma.InputJsonValue) : undefined,
        referralCodeId,
      },
    });

    if (referralCodeId) {
      await prisma.referralEvent.create({
        data: {
          referralCodeId,
          type: 'APPLICATION',
          hubUserId,
          programApplicationId: application.id,
        },
      });
    }

    return { message: 'Application submitted.' };
  }

  async getApplicants(slug: string) {
    const program = await prisma.program.findUnique({ where: { slug } });
    if (!program) {
      throw new NotFoundException('Program not found');
    }
    const applications = await prisma.programApplication.findMany({
      where: { programId: program.id },
      include: { hubUser: true, referralCode: true },
      orderBy: { createdAt: 'desc' },
    });
    return applications.map(toPublicProgramApplication);
  }

  async updateApplicant(slug: string, applicationId: string, dto: UpdateApplicantDto) {
    const program = await prisma.program.findUnique({ where: { slug } });
    if (!program) {
      throw new NotFoundException('Program not found');
    }

    const application = await prisma.programApplication.findUnique({
      where: { id: applicationId },
    });
    if (!application || application.programId !== program.id) {
      throw new NotFoundException('Application not found');
    }

    const updated = await prisma.programApplication.update({
      where: { id: applicationId },
      data: {
        status: dto.status as never,
        attendedAt: dto.attended === undefined ? undefined : dto.attended ? new Date() : null,
      },
      include: { hubUser: true, referralCode: true },
    });
    return toPublicProgramApplication(updated);
  }

  async getOrCreateReferralCode(slug: string, hubUserId: string) {
    const program = await prisma.program.findUnique({ where: { slug } });
    if (!program) {
      throw new NotFoundException('Program not found');
    }

    const existing = await prisma.referralCode.findUnique({
      where: { ownerHubUserId_programId: { ownerHubUserId: hubUserId, programId: program.id } },
    });
    if (existing) {
      return { code: existing.code };
    }

    for (let attempt = 0; attempt < 3; attempt++) {
      const code = randomBytes(4).toString('hex').toUpperCase();
      try {
        const created = await prisma.referralCode.create({
          data: { code, type: 'PERSONAL', programId: program.id, ownerHubUserId: hubUserId },
        });
        return { code: created.code };
      } catch {
        // unique constraint collision on `code` (astronomically unlikely) — retry with a new random code
      }
    }
    throw new BadRequestException('Could not generate a referral code, please try again');
  }

  async createReferralCode(slug: string, dto: CreateReferralCodeDto) {
    const program = await prisma.program.findUnique({ where: { slug } });
    if (!program) {
      throw new NotFoundException('Program not found');
    }

    const existing = await prisma.referralCode.findUnique({ where: { code: dto.code } });
    if (existing) {
      throw new ConflictException('This code is already taken');
    }

    const created = await prisma.referralCode.create({
      data: { code: dto.code, label: dto.label, type: 'CUSTOM', programId: program.id },
    });
    return { code: created.code };
  }

  async trackClick(slug: string, code: string) {
    const program = await prisma.program.findUnique({ where: { slug } });
    if (!program) {
      return { ok: true };
    }
    const referralCode = await prisma.referralCode.findUnique({ where: { code } });
    if (!referralCode || referralCode.programId !== program.id) {
      return { ok: true };
    }
    await prisma.referralEvent.create({ data: { referralCodeId: referralCode.id, type: 'CLICK' } });
    return { ok: true };
  }

  async getReferralOverview(slug: string) {
    const program = await prisma.program.findUnique({ where: { slug } });
    if (!program) {
      throw new NotFoundException('Program not found');
    }

    const codes = await prisma.referralCode.findMany({
      where: { programId: program.id },
      include: { ownerHubUser: true },
      orderBy: { createdAt: 'desc' },
    });

    const events = await prisma.referralEvent.groupBy({
      by: ['referralCodeId', 'type'],
      where: { referralCode: { programId: program.id } },
      _count: { _all: true },
    });
    const countFor = (codeId: string, type: string) =>
      events.find((e) => e.referralCodeId === codeId && e.type === type)?._count._all ?? 0;

    const publicCodes = codes.map((c) => ({
      id: c.id,
      code: c.code,
      type: c.type,
      label: c.label,
      ownerName: c.ownerHubUser ? `${c.ownerHubUser.firstName} ${c.ownerHubUser.lastName}` : null,
      clicks: countFor(c.id, 'CLICK'),
      signups: countFor(c.id, 'SIGNUP'),
      applications: countFor(c.id, 'APPLICATION'),
      createdAt: c.createdAt,
    }));

    const totalClicks = publicCodes.reduce((sum, c) => sum + c.clicks, 0);
    const totalSignups = publicCodes.reduce((sum, c) => sum + c.signups, 0);
    const totalReferredApplications = publicCodes.reduce((sum, c) => sum + c.applications, 0);

    const [totalApplications, accepted, rejected, attended] = await Promise.all([
      prisma.programApplication.count({ where: { programId: program.id } }),
      prisma.programApplication.count({ where: { programId: program.id, status: 'ACCEPTED' } }),
      prisma.programApplication.count({ where: { programId: program.id, status: 'REJECTED' } }),
      prisma.programApplication.count({
        where: { programId: program.id, attendedAt: { not: null } },
      }),
    ]);

    const summary: ProgramFunnelSummary = {
      clicks: totalClicks,
      signups: totalSignups,
      applications: totalApplications,
      organicApplications: totalApplications - totalReferredApplications,
      accepted,
      rejected,
      attended,
    };

    return { summary, codes: publicCodes };
  }

  async create(dto: CreateProgramDto) {
    const existing = await prisma.program.findUnique({ where: { slug: dto.slug } });
    if (existing) {
      throw new ConflictException('A program with this slug already exists');
    }

    const program = await prisma.program.create({
      data: {
        ...dto,
        phases: dto.phases as unknown as Prisma.InputJsonValue,
        sponsors: dto.sponsors as unknown as Prisma.InputJsonValue,
      },
      include: FORM_INCLUDE,
    });
    return toPublicProgram(program);
  }

  async update(slug: string, dto: UpdateProgramDto) {
    const existing = await prisma.program.findUnique({ where: { slug } });
    if (!existing) {
      throw new NotFoundException('Program not found');
    }

    if (dto.slug && dto.slug !== slug) {
      const slugTaken = await prisma.program.findUnique({ where: { slug: dto.slug } });
      if (slugTaken) {
        throw new ConflictException('A program with this slug already exists');
      }
    }

    const program = await prisma.program.update({
      where: { slug },
      data: {
        ...dto,
        phases: dto.phases ? (dto.phases as unknown as Prisma.InputJsonValue) : undefined,
        sponsors: dto.sponsors ? (dto.sponsors as unknown as Prisma.InputJsonValue) : undefined,
      },
      include: FORM_INCLUDE,
    });
    return toPublicProgram(program);
  }

  async remove(slug: string) {
    const existing = await prisma.program.findUnique({ where: { slug } });
    if (!existing) {
      throw new NotFoundException('Program not found');
    }
    await prisma.program.delete({ where: { slug } });
    return { message: 'Program deleted.' };
  }
}
