import { IsIn, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

const CATEGORIES = ['GOVERNMENTAL', 'ORGANIZATIONS', 'EMPLOYERS', 'UNIVERSITIES'];

export class CreatePartnerLogoDto {
  @IsIn(CATEGORIES)
  category!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  imageUrl!: string;

  @IsInt()
  @Min(1)
  width!: number;

  @IsInt()
  @Min(1)
  height!: number;
}
