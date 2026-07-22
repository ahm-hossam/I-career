import { IsNotEmpty, IsString } from 'class-validator';

export class TrackClickDto {
  @IsString()
  @IsNotEmpty()
  code!: string;
}
