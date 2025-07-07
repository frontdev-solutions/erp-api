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
import { ApiProperty } from '@nestjs/swagger';
import dayjs from 'dayjs';

export enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export class UserDto {
  @ApiProperty({
    default: 'Adrianus Yoga',
    required: false,
  })
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty({
    default: 'Prasetyo',
    required: false,
  })
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty({
    default: 'Yoga',
  })
  @IsString()
  @IsNotEmpty()
  sureName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    default: 'yoga@example.com',
  })
  email: string;

  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  @ApiProperty({
    default: 'P@ssw0rd',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    default: '084126473432',
  })
  phoneNumber: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    default: null,
  })
  userImage?: string;

  @ApiProperty({
    required: false,
    default: 'Surakarta',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    required: false,
    default: dayjs(),
  })
  @IsOptional()
  @IsString()
  birthDate?: string;

  @ApiProperty({
    required: false,
    default: 'Surakarta',
  })
  @IsOptional()
  @IsString()
  birthPlace?: string;

  @ApiProperty({
    enum: ['male', 'female'],
    required: false,
  })
  @IsOptional()
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.toUpperCase() : value,
  )
  @IsEnum(GenderEnum)
  gender?: GenderEnum;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    default: dayjs(),
  })
  joinAt?: string;

  @ApiProperty({
    required: false,
    default: '0ee4f851-96bf-4575-9457-878c1be144eb',
  })
  @IsOptional()
  @IsString()
  roleId?: string;

  @ApiProperty({
    required: false,
    type: 'boolean',
  })
  @IsBoolean()
  active: boolean;
}

export class UpdateUserDto extends PartialType(UserDto) {}

export class UserQueryDto extends PaginationDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  joinAt?: string;

  @ApiProperty({
    required: false,
    enum: ['male', 'female'],
  })
  @IsOptional()
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.toUpperCase() : value,
  )
  @IsEnum(GenderEnum)
  gender?: GenderEnum;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  roleId?: string;
  @ApiProperty({
    required: false,
    type: 'boolean',
  })
  @IsString()
  @IsOptional()
  active?: string;
}
