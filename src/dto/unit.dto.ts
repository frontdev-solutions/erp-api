import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaginationDto } from './pagination.dto';

export class UnitConversionDto {
  @IsString()
  @IsNotEmpty()
  fromUnitId: string;
  @IsString()
  @IsNotEmpty()
  toUnitId: string;
  @IsNumber()
  @IsNotEmpty()
  factor: number;
  @IsBoolean()
  @IsOptional()
  isManual?: boolean;
  @IsNumber()
  @IsOptional()
  productId?: string;
}

export class UnitDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  code: string;
}

export class UnitQueryDto extends PaginationDto {
  @IsString()
  @IsOptional()
  manualConversion?: string;
}
