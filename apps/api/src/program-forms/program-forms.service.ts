import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '@i-career/database';
import { toPublicProgramForm } from '../common/types/public-program-form';
import type { CreateProgramFormDto } from './dto/create-program-form.dto';
import type { UpdateProgramFormDto } from './dto/update-program-form.dto';

@Injectable()
export class ProgramFormsService {
  async findAll() {
    const forms = await prisma.programForm.findMany({
      include: { fields: true, _count: { select: { programs: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return forms.map(toPublicProgramForm);
  }

  async findOne(id: string) {
    const form = await prisma.programForm.findUnique({
      where: { id },
      include: { fields: true, _count: { select: { programs: true } } },
    });
    if (!form) {
      throw new NotFoundException('Form not found');
    }
    return toPublicProgramForm(form);
  }

  async create(dto: CreateProgramFormDto) {
    const form = await prisma.programForm.create({
      data: {
        name: dto.name,
        fields: {
          create: dto.fields.map((f, i) => ({
            label: f.label,
            type: f.type as never,
            required: f.required,
            options: f.options,
            order: i,
          })),
        },
      },
      include: { fields: true, _count: { select: { programs: true } } },
    });
    return toPublicProgramForm(form);
  }

  async update(id: string, dto: UpdateProgramFormDto) {
    const existing = await prisma.programForm.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Form not found');
    }

    const form = await prisma.$transaction(async (tx) => {
      if (dto.fields) {
        await tx.programFormField.deleteMany({ where: { formId: id } });
      }
      return tx.programForm.update({
        where: { id },
        data: {
          name: dto.name,
          fields: dto.fields
            ? {
                create: dto.fields.map((f, i) => ({
                  label: f.label,
                  type: f.type as never,
                  required: f.required,
                  options: f.options,
                  order: i,
                })),
              }
            : undefined,
        },
        include: { fields: true, _count: { select: { programs: true } } },
      });
    });
    return toPublicProgramForm(form);
  }

  async remove(id: string) {
    const existing = await prisma.programForm.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Form not found');
    }
    await prisma.programForm.delete({ where: { id } });
    return { message: 'Form deleted.' };
  }
}
