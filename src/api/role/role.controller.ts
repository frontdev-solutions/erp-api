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
  getListRole(@Query() query: RoleQueryDto) {
    return this.roleService.getListRole(query);
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
