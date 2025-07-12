import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let title = 'Internal Server Error';

    // Prisma Client error handling
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      if (exception.code === 'P2002') {
        status = HttpStatus.CONFLICT;
        const targetValue = exception.meta?.target;
        const target = Array.isArray(targetValue)
          ? (targetValue as string[]).join(', ')
          : typeof targetValue === 'string'
            ? targetValue
            : targetValue !== undefined
              ? JSON.stringify(targetValue)
              : '';
        message = `Unique constraint failed on the fields: (${target})`;
        title = 'Conflict';
      } else if (exception.code === 'P2025') {
        status = HttpStatus.NOT_FOUND;
        message = `Record not found`;
        title = 'Not Found';
      }
    }

    // NestJS HttpException handling
    else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const responseBody = exception.getResponse();

      // Cek jika responseBody adalah string dan isinya seperti "Cannot GET /"
      if (
        status === HttpStatus.NOT_FOUND &&
        typeof responseBody === 'string' &&
        responseBody.startsWith('Cannot ')
      ) {
        // Ini berarti route tidak ditemukan
        message = 'Route not found';
        title = 'Not Found';
      } else if (typeof responseBody === 'string') {
        message = responseBody;
      } else if (typeof responseBody === 'object' && responseBody !== null) {
        if (
          typeof responseBody === 'object' &&
          responseBody !== null &&
          'message' in responseBody &&
          typeof (responseBody as Record<string, unknown>).message === 'string'
        ) {
          message =
            ((responseBody as Record<string, unknown>).message as string) ||
            message;
        }
        if (
          typeof responseBody === 'object' &&
          responseBody !== null &&
          'error' in responseBody &&
          typeof (responseBody as Record<string, unknown>).error === 'string'
        ) {
          title =
            ((responseBody as Record<string, unknown>).error as string) ||
            title;
        }
      }
    }

    // Other errors (uncaught)
    else if (exception instanceof Error) {
      message = exception.message;
      title = 'Error';
    }

    response.status(status).json({
      error: {
        message,
        title,
        status,
      },
    });
  }
}
