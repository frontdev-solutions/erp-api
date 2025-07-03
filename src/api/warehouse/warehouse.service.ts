import { Injectable, NotFoundException } from '@nestjs/common';
import { WarehouseDto } from 'src/dto/warehouse.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WarehouseService {
  constructor(private prisma: PrismaService) {}

  async createWarehouse(dto: WarehouseDto) {
    const { name, location } = dto;

    const newWarehouse = await this.prisma.warehouse.create({
      data: {
        name,
        location,
      },
    });

    return {
      data: newWarehouse,
      meta: {
        version: '1.0.0',
      },
    };
  }

  async updateWarehouse(id: string, dto: WarehouseDto) {
    const { name, location } = dto;

    const checkWarehouse = await this.prisma.warehouse.findUnique({
      where: {
        id,
      },
    });

    if (!checkWarehouse) {
      throw new NotFoundException(`Warehouse with ${id} not found!`);
    }

    const updateWarehouse = await this.prisma.warehouse.update({
      where: { id },
      data: {
        name,
        location,
      },
    });

    return {
      data: updateWarehouse,
      meta: {
        version: '1.0.0',
      },
    };
  }

  async getListWarehouse() {
    const warehouse = await this.prisma.warehouse.findMany();

    return {
      data: {
        data: warehouse,
      },
      meta: {
        version: '1.0.0',
      },
    };
  }

  async getDetailWarehouse(id: string) {
    const warehouse = await this.prisma.warehouse.findUnique({
      where: {
        id,
      },
    });

    if (!warehouse) {
      throw new NotFoundException(`Warehouse with ${id} not found!`);
    }

    return {
      data: warehouse,
      meta: {
        version: '1.0.0',
      },
    };
  }

  async deleteWarehouse(id: string) {
    const checkWarehouse = await this.prisma.warehouse.findUnique({
      where: { id },
    });

    if (!checkWarehouse) {
      throw new NotFoundException(`Warehouse with ${id} not found!`);
    }

    await this.prisma.warehouse.delete({
      where: {
        id,
      },
    });

    return {
      data: 'Data has been deleted!',
      meta: {
        version: '1.0.0',
      },
    };
  }
}
