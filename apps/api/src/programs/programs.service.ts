import { randomBytes } from 'node:crypto';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { prisma, type Prisma } from '@i-career/database';
import type { ProgramFunnelSummary } from '@i-career/types';
import { trackServerEvent } from '../common/facebook/track-server-event';
import { computeReferralFunnel } from '../common/referral/referral-funnel';
import { sanitizeRichText } from '../common/sanitize/sanitize-rich-text';
import { toPublicProgram } from '../common/types/public-program';
import { toPublicProgramApplication } from '../common/types/public-program-application';
import type { ApplyProgramDto } from './dto/apply-program.dto';
import type { CreateProgramDto } from './dto/create-program.dto';
import type { CreateReferralCodeDto } from './dto/create-referral-code.dto';
import type { UpdateApplicantDto } from './dto/update-applicant.dto';
import type { UpdateProgramDto } from './dto/update-program.dto';

const FORM_INCLUDE = { form: { include: { fields: true } } } as const;
const MAX_ANSWERS_KEYS = 100;
const MAX_ANSWERS_BYTES = 20_000;

function sanitizeProgramRichText<T extends Partial<CreateProgramDto>>(dto: T): T {
  return {
    ...dto,
    aboutBody: dto.aboutBody !== undefined ? sanitizeRichText(dto.aboutBody) : dto.aboutBody,
    partnerBio: dto.partnerBio !== undefined ? sanitizeRichText(dto.partnerBio) : dto.partnerBio,
    phases: dto.phases?.map((phase) => ({
      ...phase,
      description: sanitizeRichText(phase.description),
    })),
    sponsors: dto.sponsors?.map((sponsor) => ({
      ...sponsor,
      description: sanitizeRichText(sponsor.description),
    })),
  };
}

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

  async apply(slug: string, userId: string, userEmail: string, dto: ApplyProgramDto) {
    const program = await prisma.program.findUnique({ where: { slug }, include: FORM_INCLUDE });
    if (!program) {
      throw new NotFoundException('Program not found');
    }

    const existing = await prisma.programApplication.findUnique({
      where: { userId_programId: { userId, programId: program.id } },
    });
    if (existing) {
      throw new ConflictException('You have already applied to this program');
    }

    const answers = dto.answers ?? {};
    if (
      Object.keys(answers).length > MAX_ANSWERS_KEYS ||
      JSON.stringify(answers).length > MAX_ANSWERS_BYTES
    ) {
      throw new BadRequestException('Answers payload is too large');
    }

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
      if (
        referralCode &&
        (referralCode.programId === null || referralCode.programId === program.id)
      ) {
        referralCodeId = referralCode.id;
      }
    }

    const application = await prisma.programApplication.create({
      data: {
        userId,
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
          userId,
          programApplicationId: application.id,
        },
      });
    }

    void trackServerEvent('Lead', { email: userEmail }, { content_name: program.title });

    return { message: 'Application submitted.' };
  }

  async getMyApplication(slug: string, userId: string) {
    const program = await prisma.program.findUnique({ where: { slug } });
    if (!program) {
      throw new NotFoundException('Program not found');
    }

    const application = await prisma.programApplication.findUnique({
      where: { userId_programId: { userId, programId: program.id } },
    });
    if (!application) {
      return { application: null };
    }

    return {
      application: {
        id: application.id,
        status: application.status,
        attendedAt: application.attendedAt,
        createdAt: application.createdAt,
      },
    };
  }

  async getApplicants(slug: string) {
    const program = await prisma.program.findUnique({ where: { slug } });
    if (!program) {
      throw new NotFoundException('Program not found');
    }
    const applications = await prisma.programApplication.findMany({
      where: { programId: program.id },
      include: { user: true, referralCode: true },
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
      include: { user: true, referralCode: true },
    });
    return toPublicProgramApplication(updated);
  }

  async getOrCreateReferralCode(slug: string, userId: string) {
    const program = await prisma.program.findUnique({ where: { slug } });
    if (!program) {
      throw new NotFoundException('Program not found');
    }

    const existing = await prisma.referralCode.findUnique({
      where: { ownerUserId_programId: { ownerUserId: userId, programId: program.id } },
    });
    if (existing) {
      return { code: existing.code };
    }

    for (let attempt = 0; attempt < 3; attempt++) {
      const code = randomBytes(4).toString('hex').toUpperCase();
      try {
        const created = await prisma.referralCode.create({
          data: { code, type: 'PERSONAL', programId: program.id, ownerUserId: userId },
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
      data: {
        code: dto.code,
        label: dto.label,
        type: 'CUSTOM',
        source: (dto.source as never) ?? 'OTHER',
        campaignName: dto.campaignName,
        programId: program.id,
      },
    });
    return { code: created.code };
  }

  async trackClick(slug: string, code: string) {
    const program = await prisma.program.findUnique({ where: { slug } });
    if (!program) {
      return { ok: true };
    }
    const referralCode = await prisma.referralCode.findUnique({ where: { code } });
    if (
      !referralCode ||
      (referralCode.programId !== null && referralCode.programId !== program.id)
    ) {
      return { ok: true };
    }
    await prisma.referralEvent.create({ data: { referralCodeId: referralCode.id, type: 'CLICK' } });
    return { ok: true };
  }

  async trackGenericClick(code: string) {
    const referralCode = await prisma.referralCode.findUnique({ where: { code } });
    if (!referralCode) {
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
      include: { ownerUser: true },
      orderBy: { createdAt: 'desc' },
    });

    const funnelByCode = await computeReferralFunnel(codes.map((c) => c.id));

    const publicCodes = codes.map((c) => {
      const funnel = funnelByCode.get(c.id)!;
      return {
        id: c.id,
        code: c.code,
        type: c.type,
        label: c.label,
        source: c.source,
        campaignName: c.campaignName,
        ownerName: c.ownerUser ? `${c.ownerUser.firstName} ${c.ownerUser.lastName}` : null,
        ...funnel,
        createdAt: c.createdAt,
      };
    });

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

  async create(rawDto: CreateProgramDto) {
    const existing = await prisma.program.findUnique({ where: { slug: rawDto.slug } });
    if (existing) {
      throw new ConflictException('A program with this slug already exists');
    }

    const dto = sanitizeProgramRichText(rawDto);
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

  async update(slug: string, rawDto: UpdateProgramDto) {
    const existing = await prisma.program.findUnique({ where: { slug } });
    if (!existing) {
      throw new NotFoundException('Program not found');
    }

    if (rawDto.slug && rawDto.slug !== slug) {
      const slugTaken = await prisma.program.findUnique({ where: { slug: rawDto.slug } });
      if (slugTaken) {
        throw new ConflictException('A program with this slug already exists');
      }
    }

    const dto = sanitizeProgramRichText(rawDto);
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
