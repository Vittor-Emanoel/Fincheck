import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateGoalDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  targetValue: number;

  @IsNumber()
  @IsNotEmpty()
  currentValue: number;

  @IsDateString()
  @IsOptional()
  deadline?: string;

  @IsArray()
  @IsUUID(undefined, { each: true })
  @IsNotEmpty()
  bankAccountIds: string[];
}
