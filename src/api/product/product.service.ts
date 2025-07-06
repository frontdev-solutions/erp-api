import { Injectable, NotFoundException } from '@nestjs/common';
import { UnitConversion } from '@prisma/client';
import { PaginationDto } from 'src/dto/pagination.dto';
import { ProductDto } from 'src/dto/product.dto';
import { paginationMeta } from 'src/helpers/pagination';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(dto: ProductDto) {
    const {
      name,
      code,
      qty,
      price,
      productSku,
      baseUnitId,
      categoryId,
      smallestUnitId,
      isManual,
      factor,
      warehouseId,
    } = dto;

    // 1. Validasi unit
    const [baseUnit, smallestUnit] = await Promise.all([
      this.prisma.unit.findUnique({ where: { id: baseUnitId } }),
      this.prisma.unit.findUnique({ where: { id: smallestUnitId } }),
    ]);

    if (!baseUnit || !smallestUnit) {
      throw new NotFoundException('Base unit or smallest unit not found!');
    }

    // 2. Validasi isManual
    let conversionFactor = 1;
    if (isManual) {
      if (!factor || factor <= 0) {
        throw new NotFoundException(
          'Conversion factor is required for manual conversion.',
        );
      }
      conversionFactor = factor;
    } else {
      conversionFactor = await this.computeConversionFactor(
        baseUnitId,
        smallestUnitId,
      );
    }

    // 3. Hitung qty konversi
    const qtySmallestUnit = qty * conversionFactor;

    // 4. Jalankan transaksi
    return this.prisma.$transaction(async (tx) => {
      if (!categoryId) {
        throw new NotFoundException('Category ID is required');
      }

      if (typeof categoryId !== 'string') {
        throw new NotFoundException('Category ID must be a valid string');
      }

      const category = await this.prisma.category.findUnique({
        where: { id: categoryId },
      });

      if (!category) {
        throw new NotFoundException(`Category with ${categoryId} not found!`);
      }

      // 4a. Insert produk
      const product = await tx.product.create({
        data: {
          name,
          qty,
          price,
          code,
          productSku,
          smallestUnitId,
          categoryId,
          warehouseId: warehouseId ?? null,
        },
        include: {
          smallestUnit: true,
          warehouse: true,
          category: true,
        },
      });

      // 4b. Kalau manual conversion, insert UnitConversion
      let conversion: UnitConversion | null = null;

      if (isManual && product.id) {
        conversion = await tx.unitConversion.create({
          data: {
            fromUnitId: baseUnitId,
            toUnitId: smallestUnitId,
            factor,
            isManual: true,
            productId: product.id,
          },
          include: {
            fromUnit: true,
            toUnit: true,
          },
        });
      } else {
        conversion = await tx.unitConversion.findFirst({
          where: {
            fromUnitId: baseUnitId,
            toUnitId: smallestUnitId,
            isManual: false,
            productId: null,
          },
          include: {
            fromUnit: true,
            toUnit: true,
          },
        });
      }

      if (!conversion) {
        throw new NotFoundException(
          `No automatic conversion found from ${baseUnitId} to ${smallestUnitId}`,
        );
      }

      // 5. Return response lengkap
      return {
        data: {
          product: {
            ...product,
            smallestUnit: undefined,
            smallestUnitId: undefined,
            unitInfo: {
              inputQty: qty,
              factor,
              qtySmallestUnit,
              isManual: conversion.isManual,
              baseUnit: {
                ...baseUnit,
                id: baseUnit.id,
                name: baseUnit.name,
                code: baseUnit.code,
              },
              smallestUnit: {
                ...smallestUnit,
                id: smallestUnit.id,
                name: smallestUnit.name,
                code: smallestUnit.code,
              },
            },
          },
        },
        meta: {
          version: '1.0.0',
        },
      };
    });
  }

  async updateProduct(id: string, dto: ProductDto) {
    const {
      name,
      qty,
      price,
      code,
      productSku,
      baseUnitId,
      categoryId,
      smallestUnitId,
      isManual,
      factor,
      warehouseId,
    } = dto;

    // 1. Validasi unit
    const [baseUnit, smallestUnit] = await Promise.all([
      this.prisma.unit.findUnique({ where: { id: baseUnitId } }),
      this.prisma.unit.findUnique({ where: { id: smallestUnitId } }),
    ]);

    if (!baseUnit || !smallestUnit) {
      throw new NotFoundException('Base unit or smallest unit not found!');
    }

    // 2. Validasi isManual
    let conversionFactor = 1;
    if (isManual) {
      if (!factor || factor <= 0) {
        throw new NotFoundException(
          'Conversion factor is required for manual conversion.',
        );
      }
      conversionFactor = factor;
    } else {
      conversionFactor = await this.computeConversionFactor(
        baseUnitId,
        smallestUnitId,
      );
    }

    // 3. Hitung qty konversi
    const qtySmallestUnit = qty * conversionFactor;

    // 4. Jalankan transaksi
    return this.prisma.$transaction(async (tx) => {
      const checkProduct = await tx.product.findUnique({
        where: { id },
      });

      if (!checkProduct) {
        throw new NotFoundException(`Product with ${id} not found!`);
      }

      if (!categoryId) {
        throw new NotFoundException('Category ID is required');
      }

      if (typeof categoryId !== 'string') {
        throw new NotFoundException('Category ID must be a valid string');
      }

      const category = await this.prisma.category.findUnique({
        where: { id: categoryId },
      });

      if (!category) {
        throw new NotFoundException(`Category with ${categoryId} not found!`);
      }

      // 4a. Update produk
      const product = await tx.product.update({
        where: { id },
        data: {
          name,
          qty,
          price,
          code,
          productSku,
          categoryId,
          smallestUnitId,
          warehouseId: warehouseId ?? null,
        },
        include: {
          smallestUnit: true,
          warehouse: true,
          category: true,
        },
      });

      // 4b. Kalau manual conversion, insert UnitConversion
      let conversion: UnitConversion | null = null;

      if (isManual) {
        conversion = await tx.unitConversion.create({
          data: {
            fromUnitId: baseUnitId,
            toUnitId: smallestUnitId,
            factor,
            isManual: true,
            productId: product.id,
          },
          include: {
            fromUnit: true,
            toUnit: true,
          },
        });
      } else {
        conversion = await tx.unitConversion.findFirst({
          where: {
            fromUnitId: baseUnitId,
            toUnitId: smallestUnitId,
            isManual: false,
            productId: null,
          },
          include: {
            fromUnit: true,
            toUnit: true,
          },
        });
      }

      if (!conversion) {
        throw new NotFoundException(
          `No automatic conversion found from ${baseUnitId} to ${smallestUnitId}`,
        );
      }

      // 5. Return response lengkap
      return {
        data: {
          product: {
            ...product,
            smallestUnit: undefined,
            smallestUnitId: undefined,
            unitInfo: {
              inputQty: qty,
              factor,
              qtySmallestUnit,
              isManual: conversion.isManual,
              baseUnit: {
                ...baseUnit,
                id: baseUnit.id,
                name: baseUnit.name,
                code: baseUnit.code,
              },
              smallestUnit: {
                ...smallestUnit,
                id: smallestUnit.id,
                name: smallestUnit.name,
                code: smallestUnit.code,
              },
            },
          },
        },
        meta: {
          version: '1.0.0',
        },
      };
    });
  }

  async getListProduct(pagination: PaginationDto) {
    const { page, limit, order, orderBy } = pagination;

    const allowedOrderFields = [
      'name',
      'productSku',
      'price',
      'qty',
      'createdAt',
      'updatedAt',
    ];

    if (!allowedOrderFields.includes(orderBy)) {
      throw new NotFoundException(`Invalid orderBy field: ${orderBy}`);
    }

    const [total, products] = await this.prisma.$transaction([
      this.prisma.product.count(),
      this.prisma.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          [orderBy]: order,
        },
        include: {
          smallestUnit: true,
          warehouse: true,
          category: true,
        },
      }),
    ]);

    const mappingProducts = await Promise.all(
      products.map(async (item) => {
        const factorUnit = await this.prisma.unitConversion.findFirst({
          where: {
            toUnitId: item.smallestUnitId,
          },
          include: {
            fromUnit: true,
            toUnit: true,
          },
        });

        return {
          ...item,
          smallestUnit: undefined,
          smallestUnitId: undefined,
          unitInfo: factorUnit
            ? {
                inputQty: item.qty,
                factor: factorUnit.factor,
                qtySmallestUnit: item.qty * factorUnit.factor,
                baseUnit: {
                  ...factorUnit.fromUnit,
                  id: factorUnit.fromUnit.id,
                  name: factorUnit.fromUnit.name,
                  code: factorUnit.fromUnit.code,
                },
                smallestUnit: item.smallestUnit,
              }
            : null,
        };
      }),
    );

    return {
      data: {
        data: mappingProducts,
        meta: paginationMeta(total, page, limit),
      },
      meta: {
        version: '1.0.0',
      },
    };
  }

  async getDetailProduct(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        warehouse: true,
        smallestUnit: true,
        category: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ${id} not found!`);
    }

    const factorUnit = await this.prisma.unitConversion.findFirst({
      where: {
        toUnitId: product.smallestUnitId,
      },
      include: {
        fromUnit: true,
        toUnit: true,
      },
    });

    return {
      data: {
        ...product,
        smallestUnit: undefined,
        smallestUnitId: undefined,
        unitInfo: factorUnit
          ? {
              inputQty: product.qty,
              factor: factorUnit.factor,
              qtySmallestUnit: product.qty * factorUnit.factor,
              baseUnit: {
                ...factorUnit.fromUnit,
                id: factorUnit.fromUnit.id,
                name: factorUnit.fromUnit.name,
                code: factorUnit.fromUnit.code,
              },
              smallestUnit: product.smallestUnit,
            }
          : null,
      },
    };
  }

  async deleteProduct(id: string) {
    const checkProduct = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!checkProduct) {
      throw new NotFoundException(`Product with ${id} not found!`);
    }

    await this.prisma.product.delete({
      where: { id },
    });

    return {
      data: 'Data has been deleted!',
      meta: {
        version: '1.0.0',
      },
    };
  }

  private async computeConversionFactor(
    fromUnitId: string,
    toUnitId: string,
    visited = new Set<string>(),
  ): Promise<number> {
    if (fromUnitId === toUnitId) return 1;

    if (visited.has(fromUnitId)) {
      throw new Error('Circular conversion detected.');
    }
    visited.add(fromUnitId);

    const direct = await this.prisma.unitConversion.findFirst({
      where: {
        fromUnitId,
        toUnitId,
      },
    });
    if (direct) return direct.factor;

    const nextConversions = await this.prisma.unitConversion.findMany({
      where: { fromUnitId },
    });

    for (const conv of nextConversions) {
      const subFactor = await this.computeConversionFactor(
        conv.toUnitId,
        toUnitId,
        visited,
      );
      return conv.factor * subFactor;
    }

    throw new Error(`No conversion path from ${fromUnitId} to ${toUnitId}.`);
  }
}
