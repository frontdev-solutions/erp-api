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
import { ProductService } from './product.service';
import { ProductDto, ProductQueryDto } from 'src/dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/decotator/roles.decotator';

@ApiBearerAuth('jwt-token')
@Controller()
export class ProductController {
  constructor(private productService: ProductService) {}

  @Roles(null, 'super_admin', 'admin', 'supervisor')
  @Post('product')
  createProduct(@Body() dto: ProductDto) {
    return this.productService.createProduct(dto);
  }

  @Roles(null, 'super_admin', 'admin', 'supervisor')
  @Put('product/:id')
  updateProduct(@Param('id') id: string, @Body() dto: ProductDto) {
    return this.productService.updateProduct(id, dto);
  }

  @Roles(null, 'super_admin', 'admin', 'supervisor')
  @Get('product')
  getListProduct(@Query() query: ProductQueryDto) {
    return this.productService.getListProduct(query);
  }

  @Roles(null, 'super_admin', 'admin', 'supervisor')
  @Get('product/:id')
  getDetailProduct(@Param('id') id: string) {
    return this.productService.getDetailProduct(id);
  }

  @Roles(null, 'super_admin', 'admin', 'supervisor')
  @Delete('product/:id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
