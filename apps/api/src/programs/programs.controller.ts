import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { InternalTokenGuard } from '../common/guards/internal-token.guard';
import { UserSessionGuard, type UserSessionPayload } from '../common/guards/user-session.guard';
import { ApplyProgramDto } from './dto/apply-program.dto';
import { CreateProgramDto } from './dto/create-program.dto';
import { CreateReferralCodeDto } from './dto/create-referral-code.dto';
import { TrackClickDto } from './dto/track-click.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
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
  @UseGuards(UserSessionGuard)
  apply(
    @Param('slug') slug: string,
    @Body() dto: ApplyProgramDto,
    @Req() req: Request & { userSession?: UserSessionPayload },
  ) {
    return this.programsService.apply(slug, req.userSession!.sub, req.userSession!.email, dto);
  }

  @Post(':slug/track-click')
  trackClick(@Param('slug') slug: string, @Body() dto: TrackClickDto) {
    return this.programsService.trackClick(slug, dto.code);
  }

  @Post('track-click')
  trackGenericClick(@Body() dto: TrackClickDto) {
    return this.programsService.trackGenericClick(dto.code);
  }

  @Post(':slug/referral-code')
  @UseGuards(UserSessionGuard)
  getOrCreateReferralCode(
    @Param('slug') slug: string,
    @Req() req: Request & { userSession?: UserSessionPayload },
  ) {
    return this.programsService.getOrCreateReferralCode(slug, req.userSession!.sub);
  }

  @Get(':slug/my-application')
  @UseGuards(UserSessionGuard)
  getMyApplication(
    @Param('slug') slug: string,
    @Req() req: Request & { userSession?: UserSessionPayload },
  ) {
    return this.programsService.getMyApplication(slug, req.userSession!.sub);
  }

  @Get(':slug/applicants')
  @UseGuards(InternalTokenGuard)
  async getApplicants(@Param('slug') slug: string) {
    const items = await this.programsService.getApplicants(slug);
    return { items };
  }

  @Patch(':slug/applicants/:applicationId')
  @UseGuards(InternalTokenGuard)
  updateApplicant(
    @Param('slug') slug: string,
    @Param('applicationId') applicationId: string,
    @Body() dto: UpdateApplicantDto,
  ) {
    return this.programsService.updateApplicant(slug, applicationId, dto);
  }

  @Get(':slug/referral-codes')
  @UseGuards(InternalTokenGuard)
  getReferralOverview(@Param('slug') slug: string) {
    return this.programsService.getReferralOverview(slug);
  }

  @Post(':slug/referral-codes')
  @UseGuards(InternalTokenGuard)
  createReferralCode(@Param('slug') slug: string, @Body() dto: CreateReferralCodeDto) {
    return this.programsService.createReferralCode(slug, dto);
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
