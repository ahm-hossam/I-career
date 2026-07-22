import { Injectable } from '@nestjs/common';
import { prisma, type EventType } from '@i-career/database';
import { toPublicEvent } from '../common/types/public-event';

@Injectable()
export class EventsService {
  async findAll(type?: EventType) {
    const events = await prisma.event.findMany({
      where: type ? { type } : undefined,
      orderBy: { startsAt: 'asc' },
    });
    return events.map(toPublicEvent);
  }
}
