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
import { CreateRoleDto, RoleQueryDto } from 'src/dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/decotator/roles.decotator';

@ApiBearerAuth('jwt-token')
@Controller()
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Roles(null, 'super_admin', 'admin', 'supervisor')
  @Post('role')
  createRole(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }

  @Roles(null, 'super_admin', 'admin', 'supervisor')
  @Put('role/:id')
  updateRole(@Param('id') id: string, @Body() dto: CreateRoleDto) {
    return this.roleService.updateRole(id, dto);
  }

  @Roles(null, 'super_admin', 'admin', 'supervisor')
  @Get('role')
  getListRole(@Query() query: RoleQueryDto) {
    return this.roleService.getListRole(query);
  }

  @Roles(null, 'super_admin', 'admin', 'supervisor')
  @Get('role/:id')
  getDetailRole(@Param('id') id: string) {
    return this.roleService.getDetailRole(id);
  }

  @Roles(null, 'super_admin', 'admin', 'supervisor')
  @Delete('role/:id')
  deleteRole(@Param('id') id: string) {
    return this.roleService.deleteRole(id);
  }
}
