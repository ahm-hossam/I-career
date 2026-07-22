import { IsBoolean, IsIn, IsOptional } from 'class-validator';

const STATUSES = ['PENDING', 'ACCEPTED', 'REJECTED'];

export class UpdateApplicantDto {
  @IsOptional()
  @IsIn(STATUSES)
  status?: string;

  @IsOptional()
  @IsBoolean()
  attended?: boolean;
}
