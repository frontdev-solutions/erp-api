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
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/decotator/roles.decotator';

@ApiBearerAuth('jwt-token')
@Controller()
export class WarehouseController {
  constructor(private warehouseService: WarehouseService) {}

  @Roles(null, 'super_admin', 'admin', 'supervisor')
  @Post('warehouse')
  createWarehouse(@Body() dto: WarehouseDto) {
    return this.warehouseService.createWarehouse(dto);
  }

  @Roles(null, 'super_admin', 'admin', 'supervisor')
  @Put('warehouse/:id')
  updateWarehouse(@Param('id') id: string, @Body() dto: WarehouseDto) {
    return this.warehouseService.updateWarehouse(id, dto);
  }

  @Roles(null, 'super_admin', 'admin', 'supervisor')
  @Get('warehouse')
  getListWarehouse(@Query() query: WarehouseQueryDto) {
    return this.warehouseService.getListWarehouse(query);
  }

  @Roles(null, 'super_admin', 'admin', 'supervisor')
  @Get('warehouse/:id')
  getDetailWarehouse(@Param('id') id: string) {
    return this.warehouseService.getDetailWarehouse(id);
  }

  @Roles(null, 'super_admin', 'admin', 'supervisor')
  @Delete('warehouse/:id')
  deleteWarehouse(@Param('id') id: string) {
    return this.warehouseService.deleteWarehouse(id);
  }
}
