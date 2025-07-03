import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from 'src/dto';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('users')
  createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @Put('users/:id')
  updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.updateUser(id, dto);
  }

  @Get('users')
  getListUser() {
    return this.usersService.getListUser();
  }

  @Get('users/:id')
  getDetailUser(@Param('id') id: string) {
    return this.usersService.getDetailUser(id);
  }

  @Delete('users/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
