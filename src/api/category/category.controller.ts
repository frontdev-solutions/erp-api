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
import { CategoryService } from './category.service';
import { CategoryDto } from 'src/dto/category.dto';
import { PaginationDto } from 'src/dto/pagination.dto';

@Controller()
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('category')
  createCategory(@Body() dto: CategoryDto) {
    return this.categoryService.createCategory(dto);
  }

  @Put('category/:id')
  updateCategory(@Param('id') id: string, @Body() dto: CategoryDto) {
    return this.categoryService.updateCategory(id, dto);
  }

  @Get('category')
  getListCategory(@Query() pagination: PaginationDto) {
    return this.categoryService.getListCategory(pagination);
  }

  @Get('category/:id')
  getDetailCategory(@Param('id') id: string) {
    return this.categoryService.getDetailCategory(id);
  }

  @Delete('category/:id')
  deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }
}
