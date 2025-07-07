import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaginationDto } from './pagination.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({
    default: 'Minyak Goreng',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    default: 'BML',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    default: 100,
  })
  @IsNumber()
  @IsNotEmpty()
  qty: number;

  @ApiProperty({
    default: 2000000,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    default: 'MYK-BML-001',
  })
  @IsString()
  @IsNotEmpty()
  productSku: string;

  @ApiProperty({
    default: '3b484c59-e84f-4c23-894e-8e36fe2b3ad5',
  })
  @IsString()
  @IsNotEmpty()
  smallestUnitId: string;

  @ApiProperty({
    default: '8a625cc4-c60a-4948-bf0a-0a31dfa4e609',
  })
  @IsString()
  @IsNotEmpty()
  baseUnitId: string;

  @ApiProperty({
    default: 'c1eef75e-5a8d-4368-9854-ee3a8b331d80',
  })
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({
    required: false,
    default: null,
  })
  @IsString()
  @IsOptional()
  warehouseId?: string;

  @ApiProperty({
    default: 1000,
  })
  @IsNumber()
  @IsNotEmpty()
  factor: number;

  @ApiProperty({
    required: false,
    default: false,
    type: 'boolean',
  })
  @IsBoolean()
  @IsOptional()
  isManual?: boolean;
}

export class ProductQueryDto extends PaginationDto {
  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  warehouseId?: string;

  @ApiProperty({
    required: false,
    // default: 'c1eef75e-5a8d-4368-9854-ee3a8b331d80',
  })
  @IsString()
  @IsOptional()
  categoryId?: string;

  @ApiProperty({
    required: false,
    type: 'string',
  })
  @IsString()
  @IsOptional()
  price?: number;

  // @ApiProperty({
  //   required: false,
  // })
  // @IsBoolean()
  // @IsOptional()
  // active?: boolean;
}
