import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { PaginationDto } from './pagination.dto';
import { Transform } from 'class-transformer';

export enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export class CreateUserDto {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
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
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.toUpperCase() : value,
  )
  @IsEnum(GenderEnum)
  gender?: GenderEnum;

  @IsOptional()
  @IsString()
  joinAt?: string;

  @IsOptional()
  @IsString()
  roleId?: string;

  @IsBoolean()
  active: boolean;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UserQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  joinAt?: string;
  @IsOptional()
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.toUpperCase() : value,
  )
  @IsEnum(GenderEnum)
  gender?: GenderEnum;
  @IsOptional()
  @IsString()
  roleId?: string;
  @IsString()
  @IsOptional()
  active?: string;
}
