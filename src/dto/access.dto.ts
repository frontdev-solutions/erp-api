import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum ActionEnum {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export class CreateAccessDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  resource: string;

  @IsEnum(ActionEnum)
  @IsNotEmpty()
  action: ActionEnum;

  @IsString()
  @IsOptional()
  description?: string;
}

export class AccessDto {
  @IsString()
  @IsNotEmpty()
  accessId: string;
}
