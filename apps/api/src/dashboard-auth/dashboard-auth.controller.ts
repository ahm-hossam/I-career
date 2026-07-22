import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { DashboardAuthService } from './dashboard-auth.service';
import { DashboardLoginDto } from './dto/login.dto';

@Controller('dashboard-auth')
export class DashboardAuthController {
  constructor(private readonly dashboardAuthService: DashboardAuthService) {}

  @Post('login')
  @HttpCode(200)
  login(@Body() dto: DashboardLoginDto) {
    return this.dashboardAuthService.login(dto);
  }
}
