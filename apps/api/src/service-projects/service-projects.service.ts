import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma, type ServiceCategory } from '@i-career/database';
import { toPublicServiceProject } from '../common/types/public-service-project';
import type { CreateServiceProjectDto } from './dto/create-service-project.dto';
import type { UpdateServiceProjectDto } from './dto/update-service-project.dto';

@Injectable()
export class ServiceProjectsService {
  async findAll() {
    const projects = await prisma.serviceProject.findMany({ orderBy: { order: 'asc' } });
    return projects.map(toPublicServiceProject);
  }

  async create(dto: CreateServiceProjectDto) {
    const last = await prisma.serviceProject.findFirst({
      where: { category: dto.category as ServiceCategory },
      orderBy: { order: 'desc' },
    });

    const project = await prisma.serviceProject.create({
      data: {
        category: dto.category as ServiceCategory,
        name: dto.name,
        description: dto.description ?? '',
        logoUrl: dto.logoUrl,
        linkUrl: dto.linkUrl,
        order: (last?.order ?? -1) + 1,
      },
    });
    return toPublicServiceProject(project);
  }

  async update(id: string, dto: UpdateServiceProjectDto) {
    const existing = await prisma.serviceProject.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Project not found');
    }

    const project = await prisma.serviceProject.update({
      where: { id },
      data: {
        category: dto.category as ServiceCategory | undefined,
        name: dto.name,
        description: dto.description,
        logoUrl: dto.logoUrl,
        linkUrl: dto.linkUrl,
      },
    });
    return toPublicServiceProject(project);
  }

  async remove(id: string) {
    const existing = await prisma.serviceProject.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Project not found');
    }
    await prisma.serviceProject.delete({ where: { id } });
    return { message: 'Project removed.' };
  }
}
