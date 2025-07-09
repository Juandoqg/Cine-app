import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';

@Injectable()
export class UploadService {
  private s3: S3Client;
  private bucket: string;
  private region: string;

  constructor(private readonly configService: ConfigService) {
    this.region = this.configService.get<string>('AWS_REGION')!;
    this.bucket = this.configService.get<string>('AWS_BUCKET_NAME')!;
    this.s3 = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID')!,
        secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY')!,
      },
    });
  }

  async uploadFile(file: Express.Multer.File) {
    const ext = path.extname(file.originalname);
    const Key = `uploads/${uuid()}${ext}`;

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key,
      Body: file.buffer, 
      ContentType: file.mimetype,
    });

    await this.s3.send(command);

    return {
      url: `https://${this.bucket}.s3.${this.region}.amazonaws.com/${Key}`,
      key: Key,
      name: file.originalname,
    };
  }
}
