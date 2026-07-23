import { IsIn, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

const SOURCES = ['FACEBOOK', 'INSTAGRAM', 'GOOGLE', 'EMAIL', 'OTHER'];

export class CreateCampaignDto {
  @IsOptional()
  @IsString()
  programSlug?: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z0-9_-]{3,40}$/, {
    message: 'Code must be 3-40 characters: letters, numbers, hyphens, underscores only',
  })
  code!: string;

  @IsString()
  @IsNotEmpty()
  label!: string;

  @IsOptional()
  @IsIn(SOURCES)
  source?: string;

  @IsOptional()
  @IsString()
  campaignName?: string;
}
