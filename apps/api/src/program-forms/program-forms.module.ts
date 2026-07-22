import { Module } from '@nestjs/common';
import { ProgramFormsController } from './program-forms.controller';
import { ProgramFormsService } from './program-forms.service';

@Module({
  controllers: [ProgramFormsController],
  providers: [ProgramFormsService],
})
export class ProgramFormsModule {}
