import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

const CATEGORIES = ['GOVERNMENTAL', 'ORGANIZATIONS', 'EMPLOYERS', 'UNIVERSITIES'];

export class UpdatePartnerLogoDto {
  @IsOptional()
  @IsIn(CATEGORIES)
  category?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  imageUrl?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  width?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  height?: number;
}
