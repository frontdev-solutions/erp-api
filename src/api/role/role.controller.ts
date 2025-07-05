import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from 'src/dto';
import { PaginationDto } from 'src/dto/pagination.dto';

@Controller()
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post('role')
  createRole(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }

  @Put('role/:id')
  updateRole(@Param('id') id: string, @Body() dto: CreateRoleDto) {
    return this.roleService.updateRole(id, dto);
  }

  @Get('role')
  getListRole(@Query() pagination: PaginationDto) {
    return this.roleService.getListRole(pagination);
  }

  @Get('role/:id')
  getDetailRole(@Param('id') id: string) {
    return this.roleService.getDetailRole(id);
  }

  @Delete('role/:id')
  deleteRole(@Param('id') id: string) {
    return this.roleService.deleteRole(id);
  }
}
