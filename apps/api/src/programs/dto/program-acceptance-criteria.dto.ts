import { IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class ProgramAcceptanceCriteriaDto {
  @IsOptional()
  @IsArray()
  @IsIn(['MALE', 'FEMALE'], { each: true })
  gender?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  nationality?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  governorate?: string[];

  @IsOptional()
  @IsArray()
  @IsIn(['STUDENT', 'GRADUATE'], { each: true })
  studentStatus?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  university?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  faculty?: string[];

  @IsOptional()
  @IsArray()
  @IsBoolean({ each: true })
  hasDisability?: boolean[];

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(120)
  minAge?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(120)
  maxAge?: number;
}
