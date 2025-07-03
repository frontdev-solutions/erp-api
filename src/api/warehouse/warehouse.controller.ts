import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseDto } from 'src/dto/warehouse.dto';

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
  getListWarehouse() {
    return this.warehouseService.getListWarehouse();
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
