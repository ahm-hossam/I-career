import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';
import type { EmploymentStatus, Gender, StudentStatus } from '@i-career/database';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  lastName!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;

  @IsString()
  @IsNotEmpty()
  nationality!: string;

  @IsString()
  @IsNotEmpty()
  governorate!: string;

  @IsDateString()
  birthday!: string;

  @IsEnum(['MALE', 'FEMALE'])
  gender!: Gender;

  @IsEnum(['STUDENT', 'GRADUATE'])
  studentStatus!: StudentStatus;

  @IsString()
  @IsNotEmpty()
  university!: string;

  @IsInt()
  @Min(1950)
  @Max(2100)
  graduationYear!: number;

  @IsString()
  @IsNotEmpty()
  faculty!: string;

  @IsBoolean()
  hasDisability!: boolean;

  @ValidateIf((o) => o.hasDisability)
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  disabilityDetails?: string;

  @IsEnum(['FULL_TIME', 'PART_TIME', 'FREELANCE', 'PROJECT_BASED', 'INTERNSHIP', 'UNEMPLOYED'])
  employmentStatus!: EmploymentStatus;

  @IsOptional()
  @IsString()
  referralCode?: string;
}
