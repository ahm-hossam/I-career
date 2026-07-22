import { IsNotEmpty, IsString } from 'class-validator';

export class ProgramSponsorDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  description!: string;

  @IsString()
  logoUrl!: string;
}
