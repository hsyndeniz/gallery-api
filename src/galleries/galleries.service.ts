import { Injectable } from '@nestjs/common';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { PrismaService } from '../prisma/prisma.service';
import { Gallery } from './domain/gallery';
import { MinioService } from '../minio/minio.service';

@Injectable()
export class GalleriesService {
  constructor(
    private readonly minio: MinioService,
    private readonly prisma: PrismaService,
  ) {}

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.prisma.asset.findMany({
      skip: paginationOptions.page * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findById(id: Gallery['id']) {
    return this.prisma.asset.findUnique({ where: { id } });
  }

  findByIds(ids: Gallery['id'][]) {
    return this.prisma.asset.findMany({ where: { id: { in: ids } } });
  }

  findAllTopicsWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.prisma.topic.findMany({
      skip: paginationOptions.page * paginationOptions.limit,
      take: paginationOptions.limit,
      include: { subtopics: true },
    });
  }

  findAssetByTopicId(topicId: string) {
    return this.prisma.asset.findMany({ where: { subtopicId: topicId } });
  }

  findAllTags() {
    return this.prisma.hashtag.findMany({ include: { _count: true } });
  }

  remove(id: Gallery['id']) {
    return this.prisma.asset.delete({ where: { id } });
  }
}
