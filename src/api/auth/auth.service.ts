import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { signJwt } from 'src/helpers/jwt-token';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(dto: LoginDto) {
    const { email, password } = dto;
    const user = await this.prisma.user.findUnique({
      where: {
        email,
        active: true,
      },
      include: {
        role: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const passwordCompare = bcrypt.compareSync(password, user.password);

    if (!passwordCompare) {
      throw new NotFoundException('Invalid credentials!');
    }

    const expiresIn = 432000;

    const token = signJwt(
      {
        id: user.id,
        email: user.email,
        role: user.role.code ?? null,
      },
      {
        expiresIn,
      },
    );

    return {
      data: {
        user: {
          ...user,
          password: undefined,
        },
        accessToken: {
          token,
          expiresIn: `${expiresIn}s`,
        },
      },
      meta: {
        version: '1.0.0',
      },
    };
  }

  async loginSales(dto: LoginDto) {
    const { email, password } = dto;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
        active: true,
        role: {
          code: {
            contains: 'sales',
            mode: 'insensitive',
          },
        },
      },
      include: {
        role: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const passwordCompare = bcrypt.compareSync(password, user.password);

    if (!passwordCompare) {
      throw new NotFoundException('Invalid credentials!');
    }

    const expiresIn = 432000;

    const token = signJwt(
      {
        id: user.id,
        email: user.email,
        role: user.role.code,
      },
      {
        expiresIn,
      },
    );

    return {
      data: {
        user: {
          ...user,
          password: undefined,
        },
        accessToken: {
          token,
          expiresIn: `${expiresIn}s`,
        },
      },
      meta: {
        version: '1.0.0',
      },
    };
  }
}
