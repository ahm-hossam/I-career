import { IsNotEmpty, IsString } from 'class-validator';

export class ProgramPhaseDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  description!: string;
}
