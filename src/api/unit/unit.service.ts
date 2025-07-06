import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UnitConversionDto, UnitDto, UnitQueryDto } from 'src/dto';
import { paginationMeta } from 'src/helpers/pagination';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UnitService {
  constructor(private prisma: PrismaService) {}

  /* Unit Conversion Service */
  async createUnitConversion(dto: UnitConversionDto) {
    const { fromUnitId, toUnitId, factor, isManual, productId } = dto;

    const [fromUnit, toUnit] = await Promise.all([
      this.prisma.unit.findUnique({ where: { id: fromUnitId } }),
      this.prisma.unit.findUnique({ where: { id: toUnitId } }),
    ]);

    if (!(fromUnitId || toUnitId)) {
      throw new NotFoundException('From unit and To unit IDs are required');
    }

    if (fromUnitId === toUnitId) {
      throw new NotFoundException('From unit and To unit cannot be the same');
    }

    if (!fromUnit || !toUnit) {
      throw new NotFoundException('From unit or To unit not found');
    }

    if (typeof factor !== 'number' || isNaN(factor)) {
      throw new NotFoundException('Conversion factor must be a valid number');
    }

    if (factor <= 0) {
      throw new NotFoundException(
        'Conversion factor must be greater than zero',
      );
    }

    if (isManual && !productId) {
      throw new NotFoundException(
        'Product ID is required for manual unit conversion',
      );
    } else if (!isManual && productId) {
      throw new NotFoundException(
        'Product ID should not be provided for automatic unit conversion',
      );
    }

    const newUnitConversion = await this.prisma.unitConversion.create({
      data: {
        fromUnitId,
        toUnitId,
        factor,
        isManual,
        productId: productId && isManual ? productId : null,
      },
      include: {
        fromUnit: true,
        toUnit: true,
        product: true,
      },
    });

    return {
      data: newUnitConversion,
      meta: {
        version: '1.0.0',
      },
    };
  }

  async getListUnitConverstion() {
    const units = await this.prisma.unitConversion.findMany({
      include: {
        fromUnit: true,
        toUnit: true,
        product: true,
      },
    });

    return {
      data: {
        data: units,
      },
      meta: {
        version: '1.0.0',
      },
    };
  }

  /* Unit Service */
  async createUnit(dto: UnitDto) {
    const { name, code } = dto;

    if (!name || !code) {
      throw new NotFoundException('Name and Display Name are required');
    }

    const newUnit = await this.prisma.unit.create({
      data: {
        name,
        code,
      },
    });

    return {
      data: newUnit,
      meta: {
        version: '1.0.0',
      },
    };
  }

  async updateUnit(id: string, dto: UnitDto) {
    const { name, code } = dto;

    const checkUnit = await this.prisma.unit.findUnique({
      where: {
        id,
      },
    });

    if (!checkUnit) {
      throw new NotFoundException(`Unit with ${id} not found!`);
    }

    const unitUpdate = await this.prisma.unit.update({
      where: { id },
      data: {
        name,
        code,
      },
    });

    return {
      data: unitUpdate,
      meta: {
        version: '1.0.0',
      },
    };
  }

  async getListUnit(query: UnitQueryDto) {
    const { page, limit, order, orderBy, keyword, manualConversion } = query;

    const allowedOrderFields = ['name', 'code', 'createdAt', 'updatedAt'];

    if (!allowedOrderFields.includes(orderBy)) {
      throw new NotFoundException(`Invalid orderBy field: ${orderBy}`);
    }

    const isManual =
      manualConversion === 'true'
        ? true
        : manualConversion === 'false'
          ? false
          : undefined;

    const where: Prisma.UnitWhereInput = {
      ...(keyword && {
        OR: [
          { name: { contains: keyword, mode: 'insensitive' } },
          { code: { contains: keyword, mode: 'insensitive' } },
        ],
      }),
      ...(isManual !== undefined &&
        (isManual
          ? {
              OR: [
                { fromConversions: { some: { isManual: true } } },
                { toConversions: { some: { isManual: true } } },
              ],
            }
          : {
              AND: [
                { fromConversions: { none: { isManual: true } } },
                { toConversions: { none: { isManual: true } } },
              ],
            })),
    };

    const [total, data] = await this.prisma.$transaction([
      this.prisma.unit.count({ where }),
      this.prisma.unit.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          [orderBy]: order,
        },
        include: {
          fromConversions: {
            where: { isManual: true },
            select: { id: true },
          },
          toConversions: {
            where: { isManual: true },
            select: { id: true },
          },
        },
      }),
    ]);

    const mappedData = data.map((unit) => ({
      ...unit,
      fromConversions: undefined,
      toConversions: undefined,
      manualConversion:
        unit.fromConversions.length > 0 || unit.toConversions.length > 0,
    }));

    return {
      data: {
        data: mappedData,
        meta: paginationMeta(total, page, limit),
      },
      meta: {
        version: '1.0.0',
      },
    };
  }

  async getDetailUnit(id: string) {
    const unit = await this.prisma.unit.findUnique({
      where: { id },
    });

    if (!unit) {
      throw new NotFoundException(`Unit with ${id} not found!`);
    }

    return {
      data: unit,
      meta: {
        version: '1.0.0',
      },
    };
  }

  async deleteUnit(id: string) {
    const unit = await this.prisma.unit.findUnique({
      where: { id },
    });

    if (!unit) {
      throw new NotFoundException(`Unit with ${id} not found!`);
    }

    await this.prisma.unit.delete({
      where: { id },
    });

    return {
      data: 'Data has been deleted!',
      meta: {
        version: '1.0.0',
      },
    };
  }
}
