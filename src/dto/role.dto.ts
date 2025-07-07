import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AccessDto } from './access.dto';
import { PaginationDto } from './pagination.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    default: 'Staff',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    default: 'staff',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsBoolean()
  @ApiProperty({
    required: false,
    default: true,
    type: 'boolean',
  })
  active: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AccessDto)
  @ApiProperty({
    required: false,
    default: [
      {
        accessId: '731554ba-d3b3-471d-bf6b-e413c68696a2',
      },
    ],
  })
  accesses?: AccessDto[];
}

export class RoleQueryDto extends PaginationDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    default: true,
    type: 'boolean',
  })
  active?: string;
}
