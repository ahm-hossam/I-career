import { IsEmail, IsString } from 'class-validator';

export class HubLoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}
