import { IsIn } from 'class-validator';

const STATUSES = ['NEW', 'READ', 'RESOLVED'];

export class UpdateContactSubmissionDto {
  @IsIn(STATUSES)
  status!: string;
}
