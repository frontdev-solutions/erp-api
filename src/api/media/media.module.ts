import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { CloudinaryProvider } from 'src/helpers/cloudinary';

@Module({
  imports: [PrismaModule],
  controllers: [MediaController],
  providers: [MediaService, CloudinaryProvider],
})
export class MediaModule {}
