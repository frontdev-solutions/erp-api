import { IsNotEmpty, IsString } from 'class-validator';
import { PaginationDto } from './pagination.dto';
import { ApiProperty } from '@nestjs/swagger';

export class WarehouseDto {
  @ApiProperty({
    default: 'Gudang Surakarta',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    default: 'GDG-SKA',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    default: 'Surakarta',
  })
  @IsString()
  @IsNotEmpty()
  address: string;
}

export class WarehouseQueryDto extends PaginationDto {}
