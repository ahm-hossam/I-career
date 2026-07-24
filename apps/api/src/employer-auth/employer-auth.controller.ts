import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { EmployerAuthService } from './employer-auth.service';
import { EmployerLoginDto } from './dto/login.dto';
import { RegisterCompanyDto } from './dto/register-company.dto';
import { RegisterExistingCompanyDto } from './dto/register-existing.dto';

const AUTH_THROTTLE = { default: { limit: 5, ttl: 60_000 } };

@Controller('employer-auth')
export class EmployerAuthController {
  constructor(private readonly employerAuthService: EmployerAuthService) {}

  @Get('companies')
  async searchCompanies(@Query('q') q = '') {
    const items = await this.employerAuthService.searchCompanies(q);
    return { items };
  }

  @Post('register')
  @Throttle(AUTH_THROTTLE)
  register(@Body() dto: RegisterCompanyDto) {
    return this.employerAuthService.registerNewCompany(dto);
  }

  @Post('register-existing')
  @Throttle(AUTH_THROTTLE)
  registerExisting(@Body() dto: RegisterExistingCompanyDto) {
    return this.employerAuthService.registerForExistingCompany(dto);
  }

  @Post('login')
  @HttpCode(200)
  @Throttle(AUTH_THROTTLE)
  login(@Body() dto: EmployerLoginDto) {
    return this.employerAuthService.login(dto);
  }
}
