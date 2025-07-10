import { Module } from '@nestjs/common';
import { UploadController } from '../controllers/upload.controller';
import { UploadService } from '../../infraestructure/uploads/upload.service';
import { ConfigModule } from '@nestjs/config';
@Module({
   imports: [ConfigModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
