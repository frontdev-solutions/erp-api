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
import { UnitService } from './unit.service';
import { UnitConversionDto, UnitDto, UnitQueryDto } from 'src/dto';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class UnitController {
  constructor(private unitService: UnitService) {}

  /* Unit Conversion Service */
  @ApiExcludeEndpoint()
  @Post('unit-conversion')
  async createUnitConversion(@Body() dto: UnitConversionDto) {
    return this.unitService.createUnitConversion(dto);
  }

  @ApiExcludeEndpoint()
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
  async getListUnit(@Query() query: UnitQueryDto) {
    return this.unitService.getListUnit(query);
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
