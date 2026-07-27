import { Module } from '@nestjs/common';
import { ServiceProjectsController } from './service-projects.controller';
import { ServiceProjectsService } from './service-projects.service';

@Module({
  controllers: [ServiceProjectsController],
  providers: [ServiceProjectsService],
})
export class ServiceProjectsModule {}
