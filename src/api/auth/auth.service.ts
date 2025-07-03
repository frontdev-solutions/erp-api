import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(dto: LoginDto) {
    const { email, password } = dto;
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
        password: password,
        active: true,
      },
      include: {
        role: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return {
      data: {
        user: {
          ...user,
          password: undefined,
        },
      },
      meta: {
        version: '1.0.0',
      },
    };
  }
}
