import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserQueryDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { paginationMeta } from 'src/helpers/pagination';
import { Gender, Prisma } from '@prisma/client';
import dayjs from 'dayjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: CreateUserDto) {
    const {
      firstName,
      lastName,
      sureName,
      address,
      birthDate,
      birthPlace,
      gender,
      joinAt,
      password,
      email,
      phoneNumber,
      active,
      roleId,
      userImage,
    } = dto;

    const checkUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (checkUser) {
      throw new NotFoundException('User already exist');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    if (roleId) {
      const checkRole = await this.prisma.role.findUnique({
        where: {
          id: roleId,
        },
      });

      if (!checkRole) {
        throw new NotFoundException(`Role with ${roleId} not found!`);
      }
    }

    const user = await this.prisma.user.create({
      data: {
        firstName: firstName ?? null,
        lastName: lastName ?? null,
        sureName,
        address,
        birthDate,
        birthPlace,
        gender:
          gender && typeof gender === 'string'
            ? (gender.toUpperCase() as Gender)
            : gender,
        joinAt: joinAt ? dayjs(joinAt).toISOString() : null,
        password: hashPassword,
        email,
        phoneNumber,
        active,
        roleId: roleId ?? null,
        userImage: userImage ?? null,
      },
      include: {
        role: true,
      },
    });

    return {
      user: {
        ...user,
        password: undefined,
        gender: gender.toLowerCase(),
      },
      meta: {
        version: '1.0.0',
      },
    };
  }

  async updateUser(id: string, dto: UpdateUserDto) {
    const {
      firstName,
      lastName,
      sureName,
      address,
      birthDate,
      birthPlace,
      gender,
      joinAt,
      email,
      phoneNumber,
      active,
      roleId,
      userImage,
    } = dto;

    if (roleId) {
      const checkRole = await this.prisma.role.findUnique({
        where: {
          id: roleId,
        },
      });

      if (!checkRole) {
        throw new NotFoundException(`Role with ${roleId} not found!`);
      }
    }

    const checkUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!checkUser) {
      throw new NotFoundException(`User with ${id} not found!`);
    }

    const userUpdate = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        firstName: firstName ?? null,
        lastName: lastName ?? null,
        sureName,
        address,
        birthDate,
        birthPlace,
        gender:
          gender && typeof gender === 'string'
            ? (gender.toUpperCase() as Gender)
            : gender,
        joinAt: joinAt ? dayjs(joinAt).toISOString() : null,
        email,
        phoneNumber,
        active,
        roleId: roleId ?? null,
        userImage: userImage ?? null,
      },
      include: {
        role: true,
      },
    });

    if (userUpdate) {
      return {
        data: {
          ...userUpdate,
          password: undefined,
          gender: gender.toLowerCase(),
        },
        meta: {
          version: '1.0.0',
        },
      };
    }
  }

  async getListUser(query: UserQueryDto) {
    const {
      page,
      limit,
      order,
      orderBy,
      keyword,
      active,
      gender,
      joinAt,
      roleId,
    } = query;

    const allowedOrderFields = ['name', 'email', 'createdAt', 'updatedAt'];

    if (!allowedOrderFields.includes(orderBy)) {
      throw new NotFoundException(`Invalid orderBy field: ${orderBy}`);
    }

    const where: Prisma.UserWhereInput = {
      ...(keyword && {
        OR: [
          { firstName: { contains: keyword, mode: 'insensitive' } },
          { lastName: { contains: keyword, mode: 'insensitive' } },
          { sureName: { contains: keyword, mode: 'insensitive' } },
          { phoneNumber: { contains: keyword, mode: 'insensitive' } },
          { email: { contains: keyword, mode: 'insensitive' } },
          { address: { contains: keyword, mode: 'insensitive' } },
        ],
      }),
      ...(gender && {
        gender:
          gender && typeof gender === 'string'
            ? (gender.toUpperCase() as Gender)
            : gender,
      }),
      ...(roleId && { roleId }),
      ...(joinAt && {
        joinAt: {
          equals: joinAt && dayjs(joinAt).toISOString(),
        },
      }),
      ...(active !== undefined && {
        active:
          active === 'true' ? true : active === 'false' ? false : undefined,
      }),
    };

    const [total, data] = await this.prisma.$transaction([
      this.prisma.user.count({ where }),
      this.prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          [orderBy]: order,
        },
        include: {
          role: true,
        },
      }),
    ]);

    const dropPassword = data.map((data) => ({
      ...data,
      password: undefined,
      gender: data.gender.toLowerCase(),
    }));

    return {
      data: {
        data: dropPassword,
        meta: paginationMeta(total, page, limit),
      },
      meta: {
        version: '1.0.0',
      },
    };
  }

  async getDetailUser(id: string) {
    const userDetail = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        role: true,
      },
    });

    if (!userDetail) {
      throw new NotFoundException(`User with ${id} not found!`);
    }

    return {
      data: { ...userDetail, gender: userDetail.gender.toLowerCase() },
      meta: {
        version: '1.0.0',
      },
    };
  }

  async deleteUser(id: string) {
    const checkUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!checkUser) {
      throw new NotFoundException(`User with ${id} not found!`);
    }

    await this.prisma.user.delete({
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
