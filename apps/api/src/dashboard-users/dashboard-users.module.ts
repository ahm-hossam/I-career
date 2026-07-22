import { Module } from '@nestjs/common';
import { DashboardUsersController } from './dashboard-users.controller';
import { DashboardUsersService } from './dashboard-users.service';

@Module({
  controllers: [DashboardUsersController],
  providers: [DashboardUsersService],
})
export class DashboardUsersModule {}
