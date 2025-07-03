import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAccessDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  resource: string;

  @IsString()
  @IsNotEmpty()
  action: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE';

  @IsString()
  @IsOptional()
  description?: string;
}

export class AccessDto {
  @IsString()
  @IsNotEmpty()
  accessId: string;
}
