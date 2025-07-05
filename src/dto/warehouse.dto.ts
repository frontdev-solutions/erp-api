import { IsNotEmpty, IsString } from 'class-validator';

export class WarehouseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}
