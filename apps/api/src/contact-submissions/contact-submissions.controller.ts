import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { InternalTokenGuard } from '../common/guards/internal-token.guard';
import { CreateContactSubmissionDto } from './dto/create-contact-submission.dto';
import { UpdateContactSubmissionDto } from './dto/update-contact-submission.dto';
import { ContactSubmissionsService } from './contact-submissions.service';

const CONTACT_THROTTLE = { default: { limit: 5, ttl: 60_000 } };

@Controller('contact-submissions')
export class ContactSubmissionsController {
  constructor(private readonly contactSubmissionsService: ContactSubmissionsService) {}

  @Post()
  @Throttle(CONTACT_THROTTLE)
  create(@Body() dto: CreateContactSubmissionDto) {
    return this.contactSubmissionsService.create(dto);
  }

  @Get()
  @UseGuards(InternalTokenGuard)
  async findAll() {
    const items = await this.contactSubmissionsService.findAll();
    return { items };
  }

  @Patch(':id')
  @UseGuards(InternalTokenGuard)
  update(@Param('id') id: string, @Body() dto: UpdateContactSubmissionDto) {
    return this.contactSubmissionsService.update(id, dto);
  }
}
