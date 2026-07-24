import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { InternalTokenGuard } from '../common/guards/internal-token.guard';
import { CreateProgramFormDto } from './dto/create-program-form.dto';
import { UpdateProgramFormDto } from './dto/update-program-form.dto';
import { ProgramFormsService } from './program-forms.service';

@Controller('program-forms')
@UseGuards(InternalTokenGuard)
export class ProgramFormsController {
  constructor(private readonly programFormsService: ProgramFormsService) {}

  @Get()
  async findAll() {
    const items = await this.programFormsService.findAll();
    return { items };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programFormsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateProgramFormDto) {
    return this.programFormsService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProgramFormDto) {
    return this.programFormsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programFormsService.remove(id);
  }
}
