import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaDto, QueryMediaDto } from 'src/dto';
import { Request } from 'express';

@ApiBearerAuth('jwt-token')
@Controller('media')
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: MediaDto })
  uploadImage(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    return this.mediaService.uploadMediaImage(file, req);
  }

  @Get()
  getListMedia(@Query() query: QueryMediaDto) {
    return this.mediaService.getListMedia(query);
  }
}
