import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { signJwt } from 'src/services/jwt-token';

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

    const passwordCompare = bcrypt.compareSync(password, user.password);

    if (!user || !passwordCompare) {
      throw new NotFoundException('User not found!');
    }

    const expiresIn = 432000;

    const token = signJwt(
      {
        id: user.id,
        email: user.email,
        password: user.password,
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
