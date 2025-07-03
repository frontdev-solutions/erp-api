import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { RoleModule } from './api/role/role.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './api/users/users.module';
import { BusinessModule } from './api/business/business.module';

@Module({
  imports: [AuthModule, RoleModule, PrismaModule, UsersModule, BusinessModule],
})
export class AppModule {}
