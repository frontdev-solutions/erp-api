import { IsNotEmpty, IsString } from 'class-validator';
import { PaginationDto } from './pagination.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ClientDto {
  @ApiProperty({
    default: 'Haryono',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    default: 'Toko Haryono',
  })
  @IsString()
  @IsNotEmpty()
  storeName: string;

  @ApiProperty({
    default: 'Jebres, Surakarta',
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    default: '-7.551675',
  })
  @IsString()
  @IsNotEmpty()
  latitude: string;

  @ApiProperty({
    default: '110.8573813',
  })
  @IsString()
  @IsNotEmpty()
  longitude: string;
}

export class QueryClientDto extends PaginationDto {}

export class VisitOnClientDto {
  // @ApiProperty({
  //   default: '6db656b0-f130-4dd2-ae3f-164be2c2e803',
  // })
  // @IsString()
  // @IsNotEmpty()
  // userId: string;

  @ApiProperty({
    default: '7d937841-7e8b-438c-b24f-55d6ccfad1a8',
  })
  @IsString()
  @IsNotEmpty()
  clientId: string;

  @ApiProperty({
    required: false,
    default: 'test',
  })
  @IsString()
  @IsNotEmpty()
  userImage: string;

  @ApiProperty({
    default: '-7.5516906',
  })
  @IsString()
  @IsNotEmpty()
  latitude: string;

  @ApiProperty({
    default: '110.8572044',
  })
  @IsString()
  @IsNotEmpty()
  longitude: string;
}
