import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { HubSessionGuard, type HubSessionPayload } from '../common/guards/hub-session.guard';
import { ProgramsService } from './programs.service';

@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Get()
  async findAll() {
    const items = await this.programsService.findAll();
    return { items };
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.programsService.findBySlug(slug);
  }

  @Post(':slug/apply')
  @UseGuards(HubSessionGuard)
  apply(@Param('slug') slug: string, @Req() req: Request & { hubSession?: HubSessionPayload }) {
    return this.programsService.apply(slug, req.hubSession!.sub);
  }
}
