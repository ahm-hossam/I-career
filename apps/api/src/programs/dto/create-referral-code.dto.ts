import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateReferralCodeDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z0-9_-]{3,40}$/, {
    message: 'Code must be 3-40 characters: letters, numbers, hyphens, underscores only',
  })
  code!: string;

  @IsString()
  @IsNotEmpty()
  label!: string;
}
