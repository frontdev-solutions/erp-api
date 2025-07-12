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
import { ApiBearerAuth, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Roles } from 'src/decotator/roles.decotator';

@ApiBearerAuth('jwt-token')
@Controller()
export class UnitController {
  constructor(private unitService: UnitService) {}

  /* Unit Conversion Service */

  @ApiExcludeEndpoint()
  @Roles(null, 'super_admin', 'admin', 'supervisor')
  @Post('unit-conversion')
  async createUnitConversion(@Body() dto: UnitConversionDto) {
    return this.unitService.createUnitConversion(dto);
  }

  @Roles(null, 'super_admin', 'admin', 'supervisor')
  @ApiExcludeEndpoint()
  @Get('unit-conversion')
  async getListUnitConverstion() {
    return this.unitService.getListUnitConverstion();
  }

  /* Unit Service */

  @Roles(null, 'super_admin', 'admin', 'supervisor')
  @Post('unit')
  async createUnit(@Body() dto: UnitDto) {
    return this.unitService.createUnit(dto);
  }

  @Roles(null, 'super_admin', 'admin', 'supervisor')
  @Put('unit/:id')
  async updateUnit(@Param('id') id: string, @Body() dto: UnitDto) {
    return this.unitService.updateUnit(id, dto);
  }

  @Roles(null, 'super_admin', 'admin', 'supervisor')
  @Get('unit')
  async getListUnit(@Query() query: UnitQueryDto) {
    return this.unitService.getListUnit(query);
  }

  @Roles(null, 'super_admin', 'admin', 'supervisor')
  @Get('unit/:id')
  async getDetailUnit(@Param('id') id: string) {
    return this.unitService.getDetailUnit(id);
  }

  @Roles(null, 'super_admin', 'admin', 'supervisor')
  @Delete('unit/:id')
  async deleteUnit(@Param('id') id: string) {
    return this.unitService.deleteUnit(id);
  }
}
