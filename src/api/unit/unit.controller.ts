import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UnitService } from './unit.service';
import { UnitConversionDto, UnitDto } from 'src/dto/unit.dto';

@Controller()
export class UnitController {
  constructor(private unitService: UnitService) {}

  /* Unit Conversion Service */
  @Post('unit-conversion')
  async createUnitConversion(@Body() dto: UnitConversionDto) {
    return this.unitService.createUnitConversion(dto);
  }

  @Get('unit-conversion')
  async getListUnitConverstion() {
    return this.unitService.getListUnitConverstion();
  }

  /* Unit Service */
  @Post('unit')
  async createUnit(@Body() dto: UnitDto) {
    return this.unitService.createUnit(dto);
  }

  @Put('unit/:id')
  async updateUnit(@Param('id') id: string, @Body() dto: UnitDto) {
    return this.unitService.updateUnit(id, dto);
  }

  @Get('unit')
  async getListUnit() {
    return this.unitService.getListUnit();
  }

  @Get('unit/:id')
  async getDetailUnit(@Param('id') id: string) {
    return this.unitService.getDetailUnit(id);
  }

  @Delete('unit/:id')
  async deleteUnit(@Param('id') id: string) {
    return this.unitService.deleteUnit(id);
  }
}
