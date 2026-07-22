import { IsArray, IsBoolean, IsIn, IsNotEmpty, IsString } from 'class-validator';

const FIELD_TYPES = [
  'SHORT_TEXT',
  'LONG_TEXT',
  'EMAIL',
  'PHONE',
  'NUMBER',
  'DROPDOWN',
  'CHECKBOXES',
  'YES_NO',
  'DATE',
  'FILE',
];

export class ProgramFormFieldDto {
  @IsString()
  @IsNotEmpty()
  label!: string;

  @IsIn(FIELD_TYPES)
  type!: string;

  @IsBoolean()
  required!: boolean;

  @IsArray()
  @IsString({ each: true })
  options!: string[];
}
