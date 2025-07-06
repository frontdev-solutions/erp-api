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
import { WarehouseService } from './warehouse.service';
import { WarehouseDto, WarehouseQueryDto } from 'src/dto';

@Controller()
export class WarehouseController {
  constructor(private warehouseService: WarehouseService) {}

  @Post('warehouse')
  createWarehouse(@Body() dto: WarehouseDto) {
    return this.warehouseService.createWarehouse(dto);
  }

  @Put('warehouse/:id')
  updateWarehouse(@Param('id') id: string, @Body() dto: WarehouseDto) {
    return this.warehouseService.updateWarehouse(id, dto);
  }

  @Get('warehouse')
  getListWarehouse(@Query() query: WarehouseQueryDto) {
    return this.warehouseService.getListWarehouse(query);
  }

  @Get('warehouse/:id')
  getDetailWarehouse(@Param('id') id: string) {
    return this.warehouseService.getDetailWarehouse(id);
  }

  @Delete('warehouse/:id')
  deleteWarehouse(@Param('id') id: string) {
    return this.warehouseService.deleteWarehouse(id);
  }
}
