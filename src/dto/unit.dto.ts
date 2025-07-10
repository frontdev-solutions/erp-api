import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaginationDto } from './pagination.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UnitConversionDto {
  @ApiProperty({
    default: '2346ef7e-e3fb-4dc5-b51d-d5549010d8c1',
  })
  @IsString()
  @IsNotEmpty()
  fromUnitId: string;

  @ApiProperty({
    default: '4351308a-7d9f-4703-a8bd-030ddbc9b144',
  })
  @IsString()
  @IsNotEmpty()
  toUnitId: string;

  @ApiProperty({
    default: 300,
  })
  @IsNumber()
  @IsNotEmpty()
  factor: number;

  @ApiProperty({
    default: true,
    type: 'boolean',
  })
  @IsBoolean()
  @IsOptional()
  isManual?: boolean;

  @ApiProperty({
    default: '30932cd2-84fb-4708-bdb0-2761d13876b2',
  })
  @IsNumber()
  @IsOptional()
  productId?: string;
}

export class UnitDto {
  @ApiProperty({
    default: 'Kilogram',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    default: 'Kg',
  })
  @IsString()
  @IsNotEmpty()
  code: string;
}

export class UnitQueryDto extends PaginationDto {
  @ApiProperty({
    default: true,
    type: 'boolean',
    required: false,
  })
  @IsString()
  @IsOptional()
  manualConversion?: string;
}
