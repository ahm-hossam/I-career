import { IsEmail, IsString } from 'class-validator';

export class EmployerLoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}
