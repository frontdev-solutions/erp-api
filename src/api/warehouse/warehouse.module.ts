import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from '../users/users.service';
import { UsersController } from '../users/users.controller';

@Module({
  imports: [PrismaModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class WarehouseModule {}
