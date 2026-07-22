import { Controller, Get, Query } from '@nestjs/common';
import type { EventType } from '@i-career/database';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async findAll(@Query('type') type?: EventType) {
    const items = await this.eventsService.findAll(type);
    return { items };
  }
}
