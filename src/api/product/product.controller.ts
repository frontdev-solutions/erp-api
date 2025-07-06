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

@Controller()
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('product')
  createProduct(@Body() dto: ProductDto) {
    return this.productService.createProduct(dto);
  }

  @Put('product/:id')
  updateProduct(@Param('id') id: string, @Body() dto: ProductDto) {
    return this.productService.updateProduct(id, dto);
  }

  @Get('product')
  getListProduct(@Query() query: ProductQueryDto) {
    return this.productService.getListProduct(query);
  }

  @Get('product/:id')
  getDetailProduct(@Param('id') id: string) {
    return this.productService.getDetailProduct(id);
  }

  @Delete('product/:id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
