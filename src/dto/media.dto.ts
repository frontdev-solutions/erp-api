import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { PaginationDto } from './pagination.dto';

export class MediaDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  @IsNotEmpty()
  file: any;
}

export class QueryMediaDto extends PaginationDto {}
