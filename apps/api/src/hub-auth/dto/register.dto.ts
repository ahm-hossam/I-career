import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import type { Gender, StudentStatus } from '@i-career/database';

export class HubRegisterDto {
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

  @IsString()
  @IsNotEmpty()
  faculty!: string;

  @IsOptional()
  @IsString()
  referralCode?: string;
}
