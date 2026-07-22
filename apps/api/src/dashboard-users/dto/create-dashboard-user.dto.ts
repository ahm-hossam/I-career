import { IsEmail, IsIn, IsNotEmpty, IsString } from 'class-validator';

const ROLES = ['ADMIN'];

export class CreateDashboardUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @IsIn(ROLES)
  role!: string;
}
