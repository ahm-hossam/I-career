import { Transform } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

const emptyToUndefined = ({ value }: { value: unknown }) => (value === '' ? undefined : value);

export class RegisterCompanyDto {
  // Company — Basic info
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  numberOfEmployees!: string;

  @IsString()
  @IsNotEmpty()
  industry!: string;

  @IsString()
  @IsNotEmpty()
  type!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsArray()
  @IsString({ each: true })
  benefits!: string[];

  @IsOptional()
  @IsString()
  logoUrl?: string;

  // Company — Social Links
  @Transform(emptyToUndefined)
  @IsOptional()
  @IsUrl()
  linkedinUrl?: string;

  @Transform(emptyToUndefined)
  @IsOptional()
  @IsUrl()
  facebookUrl?: string;

  @Transform(emptyToUndefined)
  @IsOptional()
  @IsUrl()
  websiteUrl?: string;

  // Company — Documents
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  documentUrls?: string[];

  // Contact info / Sign-up
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsString()
  @IsNotEmpty()
  jobTitle!: string;

  @IsString()
  @MinLength(8)
  password!: string;
}
