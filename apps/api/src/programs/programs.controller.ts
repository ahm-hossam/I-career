import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { HubSessionGuard, type HubSessionPayload } from '../common/guards/hub-session.guard';
import { InternalTokenGuard } from '../common/guards/internal-token.guard';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
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

  @Post()
  @UseGuards(InternalTokenGuard)
  create(@Body() dto: CreateProgramDto) {
    return this.programsService.create(dto);
  }

  @Put(':slug')
  @UseGuards(InternalTokenGuard)
  update(@Param('slug') slug: string, @Body() dto: UpdateProgramDto) {
    return this.programsService.update(slug, dto);
  }

  @Delete(':slug')
  @UseGuards(InternalTokenGuard)
  remove(@Param('slug') slug: string) {
    return this.programsService.remove(slug);
  }
}
