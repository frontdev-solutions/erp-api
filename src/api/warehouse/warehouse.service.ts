import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDto } from 'src/dto/pagination.dto';
import { WarehouseDto } from 'src/dto/warehouse.dto';
import { paginationMeta } from 'src/helpers/pagination';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WarehouseService {
  constructor(private prisma: PrismaService) {}

  async createWarehouse(dto: WarehouseDto) {
    const { name, address } = dto;

    const newWarehouse = await this.prisma.warehouse.create({
      data: {
        name,
        address,
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
    const { name, address } = dto;

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
        address,
      },
    });

    return {
      data: updateWarehouse,
      meta: {
        version: '1.0.0',
      },
    };
  }

  async getListWarehouse(pagination: PaginationDto) {
    const { page, limit, order, orderBy } = pagination;

    const allowedOrderFields = ['name', 'createdAt', 'updatedAt'];

    if (!allowedOrderFields.includes(orderBy)) {
      throw new NotFoundException(`Invalid orderBy field: ${orderBy}`);
    }

    const [total, data] = await this.prisma.$transaction([
      this.prisma.warehouse.count(),
      this.prisma.warehouse.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          [orderBy]: order,
        },
      }),
    ]);

    return {
      data: {
        data,
        meta: paginationMeta(total, page, limit),
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
