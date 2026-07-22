import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { prisma, type Prisma } from '@i-career/database';
import { toPublicProgram } from '../common/types/public-program';
import type { CreateProgramDto } from './dto/create-program.dto';
import type { UpdateProgramDto } from './dto/update-program.dto';

@Injectable()
export class ProgramsService {
  async findAll() {
    const programs = await prisma.program.findMany({ orderBy: { createdAt: 'asc' } });
    return programs.map(toPublicProgram);
  }

  async findBySlug(slug: string) {
    const program = await prisma.program.findUnique({ where: { slug } });
    if (!program) {
      throw new NotFoundException('Program not found');
    }
    const others = await prisma.program.findMany({
      where: { slug: { not: slug } },
      orderBy: { createdAt: 'asc' },
    });
    return { program: toPublicProgram(program), otherPrograms: others.map(toPublicProgram) };
  }

  async apply(slug: string, hubUserId: string) {
    const program = await prisma.program.findUnique({ where: { slug } });
    if (!program) {
      throw new NotFoundException('Program not found');
    }

    const existing = await prisma.programApplication.findUnique({
      where: { hubUserId_programId: { hubUserId, programId: program.id } },
    });
    if (existing) {
      throw new ConflictException('You have already applied to this program');
    }

    await prisma.programApplication.create({
      data: { hubUserId, programId: program.id },
    });
    return { message: 'Application submitted.' };
  }

  async create(dto: CreateProgramDto) {
    const existing = await prisma.program.findUnique({ where: { slug: dto.slug } });
    if (existing) {
      throw new ConflictException('A program with this slug already exists');
    }

    const program = await prisma.program.create({
      data: { ...dto, phases: dto.phases as unknown as Prisma.InputJsonValue },
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
      },
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
