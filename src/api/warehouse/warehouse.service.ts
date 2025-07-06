import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { WarehouseDto, WarehouseQueryDto } from 'src/dto';
import { paginationMeta } from 'src/helpers/pagination';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WarehouseService {
  constructor(private prisma: PrismaService) {}

  async createWarehouse(dto: WarehouseDto) {
    const { name, code, address } = dto;

    const newWarehouse = await this.prisma.warehouse.create({
      data: {
        name,
        code,
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
    const { name, code, address } = dto;

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
        code,
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

  async getListWarehouse(query: WarehouseQueryDto) {
    const { page, limit, order, orderBy, keyword } = query;

    const allowedOrderFields = ['name', 'createdAt', 'updatedAt'];

    if (!allowedOrderFields.includes(orderBy)) {
      throw new NotFoundException(`Invalid orderBy field: ${orderBy}`);
    }

    const where: Prisma.WarehouseWhereInput = {
      ...(keyword && {
        OR: [
          { name: { contains: keyword, mode: 'insensitive' } },
          { code: { contains: keyword, mode: 'insensitive' } },
          { address: { contains: keyword, mode: 'insensitive' } },
        ],
      }),
    };

    const [total, data] = await this.prisma.$transaction([
      this.prisma.warehouse.count({ where }),
      this.prisma.warehouse.findMany({
        where,
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
