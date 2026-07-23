import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '@i-career/database';
import { computeProgramBreakdown, computeReferralFunnel } from '../common/referral/referral-funnel';
import type { CreateCampaignDto } from './dto/create-campaign.dto';

@Injectable()
export class CampaignsService {
  async findAll() {
    const codes = await prisma.referralCode.findMany({
      where: { type: 'CUSTOM' },
      include: {
        program: { select: { id: true, slug: true, title: true } },
        ownerUser: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const codeIds = codes.map((c) => c.id);
    const [funnelByCode, breakdownByCode] = await Promise.all([
      computeReferralFunnel(codeIds),
      computeProgramBreakdown(codeIds),
    ]);
    const webUrl = process.env.WEB_URL ?? 'http://localhost:3000';

    return codes.map((c) => {
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
        program: c.program,
        programBreakdown: breakdownByCode.get(c.id) ?? [],
        url: c.program
          ? `${webUrl}/programs/${c.program.slug}?ref=${c.code}`
          : `${webUrl}/programs?ref=${c.code}`,
      };
    });
  }

  async create(dto: CreateCampaignDto) {
    let programId: string | null = null;
    if (dto.programSlug) {
      const program = await prisma.program.findUnique({ where: { slug: dto.programSlug } });
      if (!program) {
        throw new NotFoundException('Program not found');
      }
      programId = program.id;
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
        programId,
      },
    });
    return { code: created.code };
  }

  async remove(id: string) {
    const existing = await prisma.referralCode.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Campaign not found');
    }
    await prisma.referralCode.delete({ where: { id } });
    return { message: 'Campaign removed.' };
  }
}
