import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '@i-career/database';
import { toPublicProgram } from '../common/types/public-program';

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
}
