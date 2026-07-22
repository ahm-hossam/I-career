import { IsObject, IsOptional, IsString } from 'class-validator';

export class ApplyProgramDto {
  @IsOptional()
  @IsObject()
  answers?: Record<string, string | string[]>;

  @IsOptional()
  @IsString()
  referralCode?: string;
}
