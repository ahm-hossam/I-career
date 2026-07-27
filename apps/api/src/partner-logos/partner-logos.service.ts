import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma, type PartnerLogoCategory } from '@i-career/database';
import { toPublicPartnerLogo } from '../common/types/public-partner-logo';
import type { CreatePartnerLogoDto } from './dto/create-partner-logo.dto';
import type { UpdatePartnerLogoDto } from './dto/update-partner-logo.dto';

@Injectable()
export class PartnerLogosService {
  async findAll() {
    const logos = await prisma.partnerLogo.findMany({ orderBy: { order: 'asc' } });
    return logos.map(toPublicPartnerLogo);
  }

  async create(dto: CreatePartnerLogoDto) {
    const last = await prisma.partnerLogo.findFirst({
      where: { category: dto.category as PartnerLogoCategory },
      orderBy: { order: 'desc' },
    });

    const logo = await prisma.partnerLogo.create({
      data: {
        category: dto.category as PartnerLogoCategory,
        name: dto.name,
        imageUrl: dto.imageUrl,
        width: dto.width,
        height: dto.height,
        order: (last?.order ?? -1) + 1,
      },
    });
    return toPublicPartnerLogo(logo);
  }

  async update(id: string, dto: UpdatePartnerLogoDto) {
    const existing = await prisma.partnerLogo.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Logo not found');
    }

    const logo = await prisma.partnerLogo.update({
      where: { id },
      data: {
        category: dto.category as PartnerLogoCategory | undefined,
        name: dto.name,
        imageUrl: dto.imageUrl,
        width: dto.width,
        height: dto.height,
      },
    });
    return toPublicPartnerLogo(logo);
  }

  async remove(id: string) {
    const existing = await prisma.partnerLogo.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Logo not found');
    }
    await prisma.partnerLogo.delete({ where: { id } });
    return { message: 'Logo removed.' };
  }
}
