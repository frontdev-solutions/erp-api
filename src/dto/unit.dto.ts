import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UnitConversionDto {
  @IsString()
  @IsNotEmpty()
  fromUnitId: string;
  @IsString()
  @IsNotEmpty()
  toUnitId: string;
  @IsNumber()
  @IsNotEmpty()
  factor: number;
  @IsBoolean()
  @IsOptional()
  isManual?: boolean;
  @IsNumber()
  @IsOptional()
  productId?: string;
}

export class UnitDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  displayName: string;
}

// async createProduct(dto: ProductDto) {
//   const {
//     name,
//     qty,
//     price,
//     productSku,
//     baseUnitId,
//     smallestUnitId,
//     warehouseId,
//   } = dto;

//   const [baseUnit, smallestUnit] = await Promise.all([
//     this.prisma.unit.findUnique({ where: { id: baseUnitId } }),
//     this.prisma.unit.findUnique({ where: { id: smallestUnitId } }),
//   ]);

//   if (!baseUnit || !smallestUnit) {
//     throw new NotFoundException('Units not found!');
//   }

//   const factor = await this.computeConversionFactor(
//     baseUnitId,
//     smallestUnitId,
//   );

//   const qtySmallestUnit = qty * factor;

//   const newProduct = await this.prisma.product.create({
//     data: {
//       name,
//       qty,
//       price,
//       productSku,
//       smallestUnitId,
//       warehouseId: warehouseId ?? null,
//     },
//     include: {
//       smallestUnit: true,
//     },
//   });

//   return {
//     data: {
//       product: newProduct,
//       conversionInfo: {
//         inputQty: qty,
//         factor,
//         qtySmallestUnit,
//         baseUnit: {
//           id: baseUnit.id,
//           name: baseUnit.name,
//           displayName: baseUnit.displayName,
//         },
//         smallestUnit: {
//           id: smallestUnit.id,
//           name: smallestUnit.name,
//           displayName: smallestUnit.displayName,
//         },
//       },
//     },
//     meta: {
//       version: '1.0.0',
//     },
//   };
// }
