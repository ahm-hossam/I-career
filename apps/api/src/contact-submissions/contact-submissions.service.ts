import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma, type ContactSubmissionStatus } from '@i-career/database';
import { toPublicContactSubmission } from '../common/types/public-contact-submission';
import type { CreateContactSubmissionDto } from './dto/create-contact-submission.dto';
import type { UpdateContactSubmissionDto } from './dto/update-contact-submission.dto';

@Injectable()
export class ContactSubmissionsService {
  async create(dto: CreateContactSubmissionDto) {
    const submission = await prisma.contactSubmission.create({
      data: {
        name: dto.name,
        email: dto.email,
        message: dto.message,
        audience: dto.audience,
        service: dto.service,
      },
    });
    return toPublicContactSubmission(submission);
  }

  async findAll() {
    const submissions = await prisma.contactSubmission.findMany({ orderBy: { createdAt: 'desc' } });
    return submissions.map(toPublicContactSubmission);
  }

  async update(id: string, dto: UpdateContactSubmissionDto) {
    const existing = await prisma.contactSubmission.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Submission not found');
    }

    const submission = await prisma.contactSubmission.update({
      where: { id },
      data: { status: dto.status as ContactSubmissionStatus },
    });
    return toPublicContactSubmission(submission);
  }
}
