import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from './pagination.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty({
    default: 'Tepung',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    default: 'TPG',
  })
  @IsString()
  @IsNotEmpty()
  code: string;
}

export class CategoryQueryDto extends PaginationDto {
  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  productId?: string;
}
