import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

const CATEGORIES = ['YOUTH', 'EMPLOYERS', 'NGOS'];

export class UpdateServiceProjectDto {
  @IsOptional()
  @IsIn(CATEGORIES)
  category?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  logoUrl?: string;

  @IsOptional()
  @IsString()
  linkUrl?: string;
}
