import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  v2 as cloudinary,
  UploadApiOptions,
  UploadApiResponse,
} from 'cloudinary';
import { QueryMediaDto } from 'src/dto';
import { Prisma } from '@prisma/client';
import { paginationMeta } from 'src/helpers/pagination';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class MediaService {
  constructor(private prisma: PrismaService) {}

  // async uploadMediaDocument(
  //   file: Express.Multer.File,
  // ): Promise<UploadApiResponse> {
  //   const result = await new Promise<UploadApiResponse>((resolve, reject) => {
  //     cloudinary.uploader
  //       .upload_stream(
  //         {
  //           folder: '/uploads/docs',
  //           resource_type: 'auto',
  //         } as UploadApiOptions,
  //         (error, result) => {
  //           if (error) return reject(new Error(error.message));
  //           resolve(result);
  //         },
  //       )
  //       .end(file.buffer);
  //   });

  //   const newMedia = await this.prisma.media.create({
  //     data: {
  //       fileName: result.url.split('upload/').pop() ?? '',
  //       type: result.resource_type,
  //       url: result.secure_url,
  //     },
  //   });

  //   return {
  //     data: newMedia,
  //     meta: {
  //       version: '1.0.0',
  //     },
  //   };
  // }

  async uploadMediaImage(file: Express.Multer.File, req?: Request) {
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: '/uploads/img',
            resource_type: 'auto',
            allowed_formats: ['jpg', 'png', 'webp', 'svg'],
          } as UploadApiOptions,
          (error, result) => {
            if (error) return reject(new Error(error.message));
            resolve(result);
          },
        )
        .end(file.buffer);
    });

    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const payload = decoded as jwt.JwtPayload & { id: string };

    const newMedia = await this.prisma.media.create({
      data: {
        fileName: result.url.split('uploads/img/').pop() ?? '',
        type: result.resource_type,
        url: result.secure_url,
        ownerId: payload.id,
      },
    });

    return {
      data: newMedia,
      meta: {
        version: '1.0.0',
      },
    };
  }

  async getListMedia(query: QueryMediaDto) {
    const { keyword, limit, page, order, orderBy } = query;

    const allowedOrderFields = ['name', 'createdAt', 'updatedAt'];

    if (!allowedOrderFields.includes(orderBy)) {
      throw new NotFoundException(`Invalid orderBy field: ${orderBy}`);
    }

    const where: Prisma.MediaWhereInput = {
      ...(keyword && {
        OR: [{ fileName: { contains: keyword, mode: 'insensitive' } }],
      }),
    };

    const [total, data] = await this.prisma.$transaction([
      this.prisma.media.count({ where }),
      this.prisma.media.findMany({
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
}
