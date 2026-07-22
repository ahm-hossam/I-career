import { PartialType } from '@nestjs/mapped-types';
import { CreateProgramFormDto } from './create-program-form.dto';

export class UpdateProgramFormDto extends PartialType(CreateProgramFormDto) {}
