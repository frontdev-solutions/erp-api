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
import { UsersService } from './users.service';
import { UserDto, UserQueryDto } from 'src/dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/decotator/roles.decotator';

@ApiBearerAuth('jwt-token')
@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Roles(null, 'super_admin', 'admin', 'supervisor')
  @Post('user')
  createUser(@Body() dto: UserDto) {
    return this.usersService.createUser(dto);
  }

  @Roles(null, 'super_admin', 'admin', 'supervisor')
  @Put('user/:id')
  updateUser(@Param('id') id: string, @Body() dto: UserDto) {
    return this.usersService.updateUser(id, dto);
  }

  @Roles(null, 'super_admin', 'admin', 'supervisor')
  @Get('user')
  getListUser(@Query() query: UserQueryDto) {
    return this.usersService.getListUser(query);
  }

  @Roles(null, 'super_admin', 'admin', 'supervisor')
  @Get('user/:id')
  getDetailUser(@Param('id') id: string) {
    return this.usersService.getDetailUser(id);
  }

  @Roles(null, 'super_admin', 'admin', 'supervisor')
  @Delete('user/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
