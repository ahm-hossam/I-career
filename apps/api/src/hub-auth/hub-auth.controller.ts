import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { HubAuthService } from './hub-auth.service';
import { HubLoginDto } from './dto/login.dto';
import { HubRegisterDto } from './dto/register.dto';

@Controller('hub-auth')
export class HubAuthController {
  constructor(private readonly hubAuthService: HubAuthService) {}

  @Post('register')
  register(@Body() dto: HubRegisterDto) {
    return this.hubAuthService.register(dto);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() dto: HubLoginDto) {
    return this.hubAuthService.login(dto);
  }
}
