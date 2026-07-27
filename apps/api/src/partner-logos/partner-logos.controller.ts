import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { InternalTokenGuard } from '../common/guards/internal-token.guard';
import { CreatePartnerLogoDto } from './dto/create-partner-logo.dto';
import { UpdatePartnerLogoDto } from './dto/update-partner-logo.dto';
import { PartnerLogosService } from './partner-logos.service';

@Controller('partner-logos')
export class PartnerLogosController {
  constructor(private readonly partnerLogosService: PartnerLogosService) {}

  @Get()
  async findAll() {
    const items = await this.partnerLogosService.findAll();
    return { items };
  }

  @Post()
  @UseGuards(InternalTokenGuard)
  create(@Body() dto: CreatePartnerLogoDto) {
    return this.partnerLogosService.create(dto);
  }

  @Patch(':id')
  @UseGuards(InternalTokenGuard)
  update(@Param('id') id: string, @Body() dto: UpdatePartnerLogoDto) {
    return this.partnerLogosService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(InternalTokenGuard)
  remove(@Param('id') id: string) {
    return this.partnerLogosService.remove(id);
  }
}
