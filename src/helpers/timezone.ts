import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// urutan extend harus setelah import plugin
dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class TimezoneInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => this.convertTimestamps(data)));
  }

  private convertTimestamps(obj: unknown): unknown {
    if (obj === null || obj === undefined) return obj;

    if (obj instanceof Date) {
      return dayjs(obj).tz('Asia/Jakarta').format();
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.convertTimestamps(item));
    }

    if (typeof obj === 'object') {
      const result: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(obj)) {
        result[key] = this.convertTimestamps(value);
      }
      return result;
    }

    return obj;
  }
}
