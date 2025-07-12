import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ClientService } from './client.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ClientDto, QueryClientDto, VisitOnClientDto } from 'src/dto';
import { Roles } from 'src/decotator/roles.decotator';

@ApiBearerAuth('jwt-token')
@Controller()
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Roles(null, 'super_admin', 'admin', 'supervisor')
  @Post('client')
  createClient(@Body() dto: ClientDto) {
    return this.clientService.createClient(dto);
  }

  @Roles(null, 'super_admin', 'admin', 'supervisor')
  @Put('client/:id')
  updateClient(@Param('id') id: string, @Body() dto: ClientDto) {
    return this.clientService.updateClient(id, dto);
  }

  @Roles(null, 'super_admin', 'admin', 'supervisor')
  @Get('client')
  getListClient(@Query() query: QueryClientDto) {
    return this.clientService.getListClient(query);
  }

  @Roles(null, 'super_admin', 'admin', 'supervisor')
  @Get('client/:id')
  getDetailClient(@Param('id') id: string) {
    return this.clientService.getDetailClient(id);
  }

  // visit on client
  @Roles('sales')
  @Post(':userId/sales-visit')
  salesVisit(@Param('userId') userId: string, @Body() dto: VisitOnClientDto) {
    return this.clientService.visitOnClient(userId, dto);
  }
}
