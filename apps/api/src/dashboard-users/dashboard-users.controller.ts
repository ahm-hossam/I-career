import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { InternalTokenGuard } from '../common/guards/internal-token.guard';
import { CreateDashboardUserDto } from './dto/create-dashboard-user.dto';
import { UpdateDashboardUserDto } from './dto/update-dashboard-user.dto';
import { DashboardUsersService } from './dashboard-users.service';

@Controller('dashboard-users')
@UseGuards(InternalTokenGuard)
export class DashboardUsersController {
  constructor(private readonly dashboardUsersService: DashboardUsersService) {}

  @Get()
  async findAll() {
    const items = await this.dashboardUsersService.findAll();
    return { items };
  }

  @Post()
  create(@Body() dto: CreateDashboardUserDto) {
    return this.dashboardUsersService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDashboardUserDto) {
    return this.dashboardUsersService.update(id, dto);
  }

  @Post(':id/reset-password')
  resetPassword(@Param('id') id: string) {
    return this.dashboardUsersService.resetPassword(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dashboardUsersService.remove(id);
  }
}
