import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaginationDto } from './pagination.dto';

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  code: string;
  @IsNumber()
  @IsNotEmpty()
  qty: number;
  @IsNumber()
  @IsNotEmpty()
  price: number;
  @IsString()
  @IsNotEmpty()
  productSku: string;
  @IsString()
  @IsNotEmpty()
  smallestUnitId: string;
  @IsString()
  @IsNotEmpty()
  baseUnitId: string;
  @IsString()
  @IsNotEmpty()
  categoryId: string;
  @IsString()
  @IsOptional()
  warehouseId?: string;
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

export class ProductQueryDto extends PaginationDto {
  @IsString()
  @IsOptional()
  warehouseId?: string;
  @IsString()
  @IsOptional()
  categoryId?: string;
  @IsString()
  @IsOptional()
  price?: number;
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
