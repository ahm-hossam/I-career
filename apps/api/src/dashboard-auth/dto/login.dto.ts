import { IsEmail, IsString } from 'class-validator';

export class DashboardLoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}
