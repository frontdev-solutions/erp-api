import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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
