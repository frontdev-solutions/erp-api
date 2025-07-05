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
      if (typeof responseBody === 'string') {
        message = responseBody;
      } else if (typeof responseBody === 'object' && responseBody !== null) {
        if (
          typeof responseBody === 'object' &&
          responseBody !== null &&
          'message' in responseBody
        ) {
          message = (responseBody as { message?: string }).message || message;
        }
        if (
          typeof responseBody === 'object' &&
          responseBody !== null &&
          'error' in responseBody
        ) {
          title = (responseBody as { error?: string }).error || title;
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
