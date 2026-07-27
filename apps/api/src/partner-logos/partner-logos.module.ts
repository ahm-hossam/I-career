import { Module } from '@nestjs/common';
import { PartnerLogosController } from './partner-logos.controller';
import { PartnerLogosService } from './partner-logos.service';

@Module({
  controllers: [PartnerLogosController],
  providers: [PartnerLogosService],
})
export class PartnerLogosModule {}
