import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { RoleModule } from './api/role/role.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './api/users/users.module';
import { BusinessModule } from './api/business/business.module';
import { WarehouseModule } from './api/warehouse/warehouse.module';
import { ProductModule } from './api/product/product.module';
import { UnitModule } from './api/unit/unit.module';
import { CategoryModule } from './api/category/category.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './helpers/jwt-token';

@Module({
  imports: [
    AuthModule,
    RoleModule,
    PrismaModule,
    UsersModule,
    BusinessModule,
    WarehouseModule,
    ProductModule,
    CategoryModule,
    UnitModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
