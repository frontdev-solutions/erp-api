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

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsBoolean()
  active: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AccessDto)
  accesses?: AccessDto[];
}

export class RoleQueryDto extends PaginationDto {
  @IsString()
  @IsOptional()
  active?: string;
}
