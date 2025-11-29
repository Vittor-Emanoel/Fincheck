import { BankAccountPermission } from '@prisma/client';
import {
    IsEmail,
    IsEnum,
    IsHexColor,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';
import { BankAccountType } from '../entities/BankAccount';

export class CreateBankAccountDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  initialBalance: number;

  @IsNotEmpty()
  @IsEnum(BankAccountType)
  type: BankAccountType;

  @IsString()
  @IsNotEmpty()
  @IsHexColor()
  color: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  shareWithEmail?: string;

  @IsOptional()
  @IsEnum(BankAccountPermission)
  permission?: BankAccountPermission;
}
