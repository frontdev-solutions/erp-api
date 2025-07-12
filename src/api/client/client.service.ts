import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { getDistance } from 'geolib';
import { ClientDto, QueryClientDto, VisitOnClientDto } from 'src/dto';
import { paginationMeta } from 'src/helpers/pagination';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async createClient(dto: ClientDto) {
    const { name, location, storeName, latitude, longitude } = dto;

    const client = await this.prisma.client.create({
      data: {
        name,
        storeName,
        location,
        latitude:
          typeof latitude === 'string' ? parseFloat(latitude) : latitude,
        longitude:
          typeof longitude === 'string' ? parseFloat(longitude) : longitude,
      },
    });

    return {
      data: client,
      meta: {
        version: '1.0.0',
      },
    };
  }

  async updateClient(id: string, dto: ClientDto) {
    const { name, location, storeName, latitude, longitude } = dto;
    const checkClient = await this.prisma.client.findUnique({
      where: {
        id,
      },
    });

    if (!checkClient) {
      throw new NotFoundException(`Client with ${id} not found!`);
    }

    const editClient = await this.prisma.client.update({
      where: { id },
      data: {
        name,
        location,
        storeName,
        latitude:
          typeof latitude === 'string' ? parseFloat(latitude) : latitude,
        longitude:
          typeof longitude === 'string' ? parseFloat(longitude) : longitude,
      },
    });

    return {
      data: editClient,
      meta: {
        version: '1.0.0',
      },
    };
  }

  async getListClient(query: QueryClientDto) {
    const { keyword, limit, page, order, orderBy } = query;

    const allowedOrderFields = [
      'name',
      'location',
      'storeName',
      'createdAt',
      'updatedAt',
    ];

    if (!allowedOrderFields.includes(orderBy)) {
      throw new NotFoundException(`Invalid orderBy field: ${orderBy}`);
    }

    const where: Prisma.ClientWhereInput = {
      ...(keyword && {
        OR: [
          { name: { contains: keyword, mode: 'insensitive' } },
          { storeName: { contains: keyword, mode: 'insensitive' } },
          { location: { contains: keyword, mode: 'insensitive' } },
        ],
      }),
    };

    const [total, data] = await this.prisma.$transaction([
      this.prisma.client.count({ where }),
      this.prisma.client.findMany({
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

  async getDetailClient(id: string) {
    const client = await this.prisma.client.findUnique({
      where: {
        id,
      },
    });

    if (!client) {
      throw new NotFoundException(`Client with ${id} not found!`);
    }

    return {
      data: client,
      meta: {
        version: '1.0.0',
      },
    };
  }

  async deleteClient(id: string) {
    const client = await this.prisma.client.findUnique({
      where: {
        id,
      },
    });

    if (!client) {
      throw new NotFoundException(`Client with ${id} not found!`);
    }

    await this.prisma.client.delete({
      where: { id },
    });

    return {
      data: 'Data has been deleted!',
      meta: {
        version: '1.0.0',
      },
    };
  }

  async visitOnClient(userId: string, dto: VisitOnClientDto) {
    const { clientId, latitude, longitude, userImage } = dto;

    if (userId) {
      const checkSalesRole = await this.prisma.user.findFirst({
        where: {
          id: userId,
          role: {
            code: 'sales',
          },
          active: true,
        },
        select: {
          active: true,
          id: true,
          role: {
            select: {
              code: true,
            },
          },
        },
      });

      if (!checkSalesRole) {
        throw new NotFoundException('User not found!');
      }
    }

    if (!userImage) {
      throw new NotFoundException('User image is required!');
    }

    const client = await this.prisma.client.findUnique({
      where: { id: clientId },
      select: {
        latitude: true,
        longitude: true,
      },
    });

    if (!client) {
      throw new NotFoundException(`Client with ${clientId} not found!`);
    }

    const clientDistance = {
      longitude: client.longitude,
      latitude: client.latitude,
    };

    const visitSalesDistance = {
      longitude: parseFloat(longitude),
      latitude: parseFloat(latitude),
    };

    const getDistanceClient = getDistance(clientDistance, visitSalesDistance);

    if (getDistanceClient > 10) {
      throw new NotFoundException('You are too far from the client location');
    }

    const visit = await this.prisma.visitOnClient.create({
      data: {
        clientId,
        userId,
        latitude:
          typeof latitude === 'string' ? parseFloat(latitude) : latitude,
        longitude:
          typeof longitude === 'string' ? parseFloat(longitude) : longitude,
        userImage,
      },
      include: {
        client: true,
        user: true,
      },
    });

    return {
      data: visit,
      meta: {
        version: '1.0.0',
      },
    };
  }
}
