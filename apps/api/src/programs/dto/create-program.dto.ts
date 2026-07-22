import { Type } from 'class-transformer';
import { IsArray, IsIn, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ProgramPhaseDto } from './program-phase.dto';
import { ProgramSponsorDto } from './program-sponsor.dto';

const ASPECT_RATIOS = ['16:6', '16:9', '1:1'];

export class CreateProgramDto {
  @IsString()
  @IsNotEmpty()
  slug!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  subtitleEn!: string;

  @IsOptional()
  @IsString()
  subtitleAr?: string | null;

  @IsString()
  @IsNotEmpty()
  logoUrl!: string;

  @IsIn(ASPECT_RATIOS)
  imageAspect!: string;

  @IsString()
  aboutBody!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProgramPhaseDto)
  phases!: ProgramPhaseDto[];

  @IsArray()
  @IsString({ each: true })
  benefits!: string[];

  @IsArray()
  @IsString({ each: true })
  criteria!: string[];

  @IsString()
  @IsNotEmpty()
  partnerName!: string;

  @IsString()
  partnerBio!: string;

  @IsOptional()
  @IsString()
  partnerLogoUrl?: string | null;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProgramSponsorDto)
  sponsors!: ProgramSponsorDto[];

  @IsOptional()
  @IsString()
  formId?: string | null;
}
