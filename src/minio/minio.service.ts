import { Injectable, OnModuleInit } from '@nestjs/common';
import * as Minio from 'minio';

@Injectable()
export class MinioService implements OnModuleInit {
  public minioClient: Minio.Client;
  onModuleInit() {
    // Initialize Minio client
    this.minioClient = new Minio.Client({
      endPoint: 'localhost',
      port: 9000,
      useSSL: true,
      accessKey: 'fykF0myEpEKScgpkuQKO',
      secretKey: 'eI32U78Ku8A4UIpyPMT2O1diBIju5FTouCjWkpLk',
    });
  }
}
