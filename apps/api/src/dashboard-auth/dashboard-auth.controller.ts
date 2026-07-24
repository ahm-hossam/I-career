import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { DashboardAuthService } from './dashboard-auth.service';
import { DashboardLoginDto } from './dto/login.dto';

@Controller('dashboard-auth')
export class DashboardAuthController {
  constructor(private readonly dashboardAuthService: DashboardAuthService) {}

  @Post('login')
  @HttpCode(200)
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  login(@Body() dto: DashboardLoginDto) {
    return this.dashboardAuthService.login(dto);
  }
}
