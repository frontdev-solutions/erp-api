import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  sureName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  userImage?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  birthDate?: string;

  @IsOptional()
  @IsString()
  birthPlace?: string;

  @IsOptional()
  @IsEnum(GenderEnum)
  gender?: GenderEnum;

  @IsOptional()
  @IsDateString()
  joinAt?: string;

  @IsOptional()
  @IsString()
  roleId?: string;

  @IsBoolean()
  active: boolean;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
