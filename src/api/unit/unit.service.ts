import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDto } from 'src/dto/pagination.dto';
import { UnitConversionDto, UnitDto } from 'src/dto/unit.dto';
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
    const { name, displayName } = dto;

    if (!name || !displayName) {
      throw new NotFoundException('Name and Display Name are required');
    }

    const newUnit = await this.prisma.unit.create({
      data: {
        name,
        displayName,
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
    const { name, displayName } = dto;

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
        displayName,
      },
    });

    return {
      data: unitUpdate,
      meta: {
        version: '1.0.0',
      },
    };
  }

  async getListUnit(pagination: PaginationDto) {
    const { page, limit, order, orderBy } = pagination;

    const [total, data] = await this.prisma.$transaction([
      this.prisma.unit.count(),
      this.prisma.unit.findMany({
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
