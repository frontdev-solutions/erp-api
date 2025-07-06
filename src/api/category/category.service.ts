import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CategoryDto, CategoryQueryDto } from 'src/dto';
import { paginationMeta } from 'src/helpers/pagination';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategory(dto: CategoryDto) {
    const { name, code } = dto;

    // if (!(name || code)) {
    //   throw new NotFoundException('Name or code are required!');
    // }

    const newCategory = await this.prisma.category.create({
      data: {
        name,
        code,
      },
    });

    return {
      data: newCategory,
      meta: {
        version: '1.0.0',
      },
    };
  }

  async updateCategory(id: string, dto: CategoryDto) {
    const { name, code } = dto;

    const checkCategory = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!checkCategory) {
      throw new NotFoundException(`Category with ${id} not found!`);
    }

    const category = await this.prisma.category.update({
      where: { id },
      data: {
        name,
        code,
      },
    });

    return {
      data: category,
      meta: {
        version: '1.0.0',
      },
    };
  }

  async getListCategory(query: CategoryQueryDto) {
    const { page, limit, order, orderBy, keyword, productId } = query;

    const allowedOrderFields = ['name', 'code', 'createdAt', 'updatedAt'];

    if (!allowedOrderFields.includes(orderBy)) {
      throw new NotFoundException(`Invalid orderBy field: ${orderBy}`);
    }

    const where: Prisma.CategoryWhereInput = {
      ...(keyword && {
        OR: [
          { name: { contains: keyword, mode: 'insensitive' } },
          { code: { contains: keyword, mode: 'insensitive' } },
        ],
      }),
      ...(productId && { productId }),
    };

    const [total, data] = await this.prisma.$transaction([
      this.prisma.category.count({
        where,
      }),
      this.prisma.category.findMany({
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

  async getDetailCategory(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Category with ${id} not found!`);
    }

    return {
      data: category,
      meta: {
        version: '1.0.0',
      },
    };
  }

  async deleteCategory(id: string) {
    const checkCategory = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!checkCategory) {
      throw new NotFoundException(`Category with ${id} not found!`);
    }

    await this.prisma.category.delete({
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
