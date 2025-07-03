import { Controller } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';

@Controller()
export class WarehouseController {
  constructor(private warehouseService: WarehouseService) {}
}
