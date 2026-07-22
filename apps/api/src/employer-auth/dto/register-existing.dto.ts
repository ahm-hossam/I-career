import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterExistingCompanyDto {
  @IsString()
  @IsNotEmpty()
  companyId!: string;

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
