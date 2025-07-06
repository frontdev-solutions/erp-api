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
import { CreateUserDto, UpdateUserDto, UserQueryDto } from 'src/dto';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('user')
  createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @Put('user/:id')
  updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.updateUser(id, dto);
  }

  @Get('user')
  getListUser(@Query() query: UserQueryDto) {
    return this.usersService.getListUser(query);
  }

  @Get('user/:id')
  getDetailUser(@Param('id') id: string) {
    return this.usersService.getDetailUser(id);
  }

  @Delete('user/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
