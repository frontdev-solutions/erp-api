import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from './pagination.dto';

export class CategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  code: string;
}

export class CategoryQueryDto extends PaginationDto {
  @IsString()
  @IsOptional()
  productId?: string;
}
