import { IsNotEmpty, IsString } from 'class-validator';
import { PaginationDto } from './pagination.dto';

export class WarehouseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}

export class WarehouseQueryDto extends PaginationDto {}
