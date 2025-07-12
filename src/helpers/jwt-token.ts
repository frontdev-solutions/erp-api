import * as jwt from 'jsonwebtoken';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY } from 'src/decotator/roles.decotator';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not defined');
}

export const signJwt = (payload: object, options = {}) => {
  return jwt.sign(payload, JWT_SECRET, {
    ...options,
  });
};
export function getPayload(req: Request): any {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedException('Token is missing or invalid');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded as any;
  } catch {
    throw new UnauthorizedException('Token verification failed');
  }
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Unauthorized');
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (
        typeof decoded !== 'object' ||
        decoded === null ||
        !('role' in decoded)
      ) {
        throw new UnauthorizedException('Invalid token');
      }

      const payload = decoded as jwt.JwtPayload & { role: string };

      request['user'] = payload;

      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );

      if (
        requiredRoles &&
        !requiredRoles.some((role) => payload.role?.includes(role))
      ) {
        throw new NotFoundException('Forbidden role access');
      }

      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
