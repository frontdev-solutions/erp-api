import { Controller } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SalesService } from './sales.service';

@ApiBearerAuth('jwt-token')
@Controller()
export class SalesController {
  constructor(private salesService: SalesService) {}
}
