import { IsBoolean, IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

const ROLES = ['ADMIN'];

export class UpdateDashboardUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsIn(ROLES)
  role?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
