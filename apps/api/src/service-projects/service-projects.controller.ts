import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { InternalTokenGuard } from '../common/guards/internal-token.guard';
import { CreateServiceProjectDto } from './dto/create-service-project.dto';
import { UpdateServiceProjectDto } from './dto/update-service-project.dto';
import { ServiceProjectsService } from './service-projects.service';

@Controller('service-projects')
export class ServiceProjectsController {
  constructor(private readonly serviceProjectsService: ServiceProjectsService) {}

  @Get()
  async findAll() {
    const items = await this.serviceProjectsService.findAll();
    return { items };
  }

  @Post()
  @UseGuards(InternalTokenGuard)
  create(@Body() dto: CreateServiceProjectDto) {
    return this.serviceProjectsService.create(dto);
  }

  @Patch(':id')
  @UseGuards(InternalTokenGuard)
  update(@Param('id') id: string, @Body() dto: UpdateServiceProjectDto) {
    return this.serviceProjectsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(InternalTokenGuard)
  remove(@Param('id') id: string) {
    return this.serviceProjectsService.remove(id);
  }
}
