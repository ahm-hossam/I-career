import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

const CATEGORIES = ['YOUTH', 'EMPLOYERS', 'NGOS'];

export class CreateServiceProjectDto {
  @IsIn(CATEGORIES)
  category!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  @IsNotEmpty()
  logoUrl!: string;

  @IsOptional()
  @IsString()
  linkUrl?: string;
}
