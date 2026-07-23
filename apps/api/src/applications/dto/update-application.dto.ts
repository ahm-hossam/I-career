import { IsBoolean, IsIn, IsOptional } from 'class-validator';

const STATUSES = ['PENDING', 'ACCEPTED', 'REJECTED'];

export class UpdateApplicationDto {
  @IsOptional()
  @IsIn(STATUSES)
  status?: string;

  @IsOptional()
  @IsBoolean()
  attended?: boolean;
}
