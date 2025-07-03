import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';

@Module({
  imports: [PrismaModule],
  providers: [WarehouseService],
  controllers: [WarehouseController],
})
export class WarehouseModule {}
