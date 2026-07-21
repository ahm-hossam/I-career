import { Controller, Get, UseGuards } from '@nestjs/common';
import { InternalTokenGuard } from '../common/guards/internal-token.guard';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(InternalTokenGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    const items = await this.usersService.findAll();
    return { items };
  }
}
