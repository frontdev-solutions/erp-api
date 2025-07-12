import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  // UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto, CategoryQueryDto } from 'src/dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/decotator/roles.decotator';

@ApiBearerAuth('jwt-token')
@Controller()
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Roles(null, 'super_admin', 'admin', 'supervisor')
  @Post('category')
  createCategory(@Body() dto: CategoryDto) {
    return this.categoryService.createCategory(dto);
  }

  @Roles(null, 'super_admin', 'admin', 'supervisor')
  @Put('category/:id')
  updateCategory(@Param('id') id: string, @Body() dto: CategoryDto) {
    return this.categoryService.updateCategory(id, dto);
  }

  @Roles(null, 'super_admin', 'admin', 'supervisor')
  @Get('category')
  getListCategory(@Query() query: CategoryQueryDto) {
    return this.categoryService.getListCategory(query);
  }

  @Roles(null, 'super_admin', 'admin', 'supervisor')
  @Get('category/:id')
  getDetailCategory(@Param('id') id: string) {
    return this.categoryService.getDetailCategory(id);
  }

  @Roles(null, 'super_admin', 'admin', 'supervisor')
  @Delete('category/:id')
  deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }
}
