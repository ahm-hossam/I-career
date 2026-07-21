import { Body, Controller, Get, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { InternalTokenGuard } from '../common/guards/internal-token.guard';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { PasswordResetRequestsService } from './password-reset-requests.service';

@Controller('password-reset-requests')
export class PasswordResetRequestsController {
  constructor(private readonly passwordResetRequestsService: PasswordResetRequestsService) {}

  @Post()
  @HttpCode(201)
  create(@Body() dto: ForgotPasswordDto) {
    return this.passwordResetRequestsService.create(dto);
  }

  @Get()
  @UseGuards(InternalTokenGuard)
  async findPending() {
    const items = await this.passwordResetRequestsService.findPending();
    return { items };
  }

  @Post(':id/resolve')
  @UseGuards(InternalTokenGuard)
  resolve(@Param('id') id: string) {
    return this.passwordResetRequestsService.resolve(id);
  }
}
