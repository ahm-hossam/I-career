import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { EmployerAuthService } from './employer-auth.service';
import { EmployerLoginDto } from './dto/login.dto';
import { RegisterCompanyDto } from './dto/register-company.dto';
import { RegisterExistingCompanyDto } from './dto/register-existing.dto';

@Controller('employer-auth')
export class EmployerAuthController {
  constructor(private readonly employerAuthService: EmployerAuthService) {}

  @Get('companies')
  async searchCompanies(@Query('q') q = '') {
    const items = await this.employerAuthService.searchCompanies(q);
    return { items };
  }

  @Post('register')
  register(@Body() dto: RegisterCompanyDto) {
    return this.employerAuthService.registerNewCompany(dto);
  }

  @Post('register-existing')
  registerExisting(@Body() dto: RegisterExistingCompanyDto) {
    return this.employerAuthService.registerForExistingCompany(dto);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() dto: EmployerLoginDto) {
    return this.employerAuthService.login(dto);
  }
}
