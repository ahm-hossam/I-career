import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { ProgramFormFieldDto } from './program-form-field.dto';

export class CreateProgramFormDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProgramFormFieldDto)
  fields!: ProgramFormFieldDto[];
}
