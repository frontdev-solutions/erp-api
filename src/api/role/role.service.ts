import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from 'src/dto';
import { PaginationDto } from 'src/dto/pagination.dto';
import { paginationMeta } from 'src/helpers/pagination';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async createRole(dto: CreateRoleDto) {
    const { name, displayName, active, accesses } = dto;

    const role = await this.prisma.role.create({
      data: {
        name,
        displayName,
        active,
      },
      include: {
        accesses: true,
      },
    });

    if (accesses && accesses.length > 0) {
      const accessIds = accesses.map((a) => a.accessId);

      const accessRecords = await this.prisma.access.findMany({
        where: { id: { in: accessIds } },
        select: { id: true, name: true },
      });

      if (accessRecords.length !== accessIds.length) {
        const foundIds = accessRecords.map((r) => r.id);
        const missing = accessIds.filter((id) => !foundIds.includes(id));
        throw new NotFoundException(
          `Access IDs not found: ${missing.join(', ')}`,
        );
      }

      await this.prisma.accessesOnRole.createMany({
        data: accessRecords.map((r) => ({
          accessId: r.id,
          accessName: r.name,
          roleId: role.id,
          roleName: role.name,
        })),
      });
    }

    const newRole = await this.prisma.role.findUnique({
      where: { id: role.id },
      include: { accesses: true },
    });

    return {
      data: newRole,
      meta: {
        version: '1.0.0',
      },
    };
  }

  async updateRole(id: string, dto: CreateRoleDto) {
    const { name, displayName, active, accesses } = dto;

    const checkRole = await this.prisma.role.findUnique({
      where: {
        id,
      },
    });

    if (!checkRole) {
      throw new NotFoundException(`Role with ${id} not found!`);
    }

    const role = await this.prisma.role.update({
      data: {
        name,
        displayName,
        active,
      },
      where: {
        id,
      },
      include: {
        accesses: true,
      },
    });

    await this.prisma.accessesOnRole.deleteMany({
      where: { roleId: id },
    });

    if (accesses && accesses.length > 0) {
      const accessIds = accesses.map((a) => a.accessId);

      const accessRecords = await this.prisma.access.findMany({
        where: { id: { in: accessIds } },
        select: { id: true, name: true },
      });

      if (accessRecords.length !== accessIds.length) {
        const foundIds = accessRecords.map((r) => r.id);
        const missing = accessIds.filter((id) => !foundIds.includes(id));
        throw new NotFoundException(
          `Access IDs not found: ${missing.join(', ')}`,
        );
      }

      await this.prisma.accessesOnRole.createMany({
        data: accessRecords.map((r) => ({
          accessId: r.id,
          accessName: r.name,
          roleId: id,
          roleName: role.name,
        })),
      });
    }

    const newRole = await this.prisma.role.findUnique({
      where: { id: role.id },
      include: { accesses: true },
    });

    return {
      data: newRole,
      meta: {
        version: '1.0.0',
      },
    };
  }

  async getListRole(pagination: PaginationDto) {
    const { page, limit, order, orderBy } = pagination;

    const allowedOrderFields = [
      'name',
      'displayName',
      'createdAt',
      'updatedAt',
    ];

    if (!allowedOrderFields.includes(orderBy)) {
      throw new NotFoundException(`Invalid orderBy field: ${orderBy}`);
    }

    const [total, data] = await this.prisma.$transaction([
      this.prisma.role.count(),
      this.prisma.role.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          [orderBy]: order,
        },
        include: {
          accesses: true,
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

  async getDetailRole(id: string) {
    const role = await this.prisma.role.findUnique({
      where: {
        id,
      },
      include: {
        accesses: true,
      },
    });

    if (!role) {
      throw new NotFoundException(`Role with ${id} not found!`);
    }

    return {
      data: role,
      meta: {
        version: '1.0.0',
      },
    };
  }

  async deleteRole(id: string) {
    const checkRole = await this.prisma.role.findUnique({
      where: {
        id,
      },
    });

    if (!checkRole) {
      throw new NotFoundException(`Role with ${id} not found!`);
    }

    await this.prisma.role.delete({
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
