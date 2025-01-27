import { Controller, Get, Param, Delete, Query } from '@nestjs/common';
import { GalleriesService } from './galleries.service';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Gallery, Topic } from './domain/gallery';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllGalleriesDto } from './dto/find-all-galleries.dto';

@ApiTags('Galleries')
// @ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'galleries',
  version: '1',
})
export class GalleriesController {
  constructor(private readonly galleriesService: GalleriesService) {}

  @Get('assets')
  @ApiOkResponse({ type: InfinityPaginationResponse(Gallery) })
  async findAll(
    @Query() query: FindAllGalleriesDto,
  ): Promise<InfinityPaginationResponseDto<Gallery>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.galleriesService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String, required: true })
  @ApiOkResponse({ type: Gallery })
  findById(@Param('id') id: string) {
    return this.galleriesService.findById(id);
  }

  @Get()
  @ApiOkResponse({ type: InfinityPaginationResponse(Topic) })
  async findAllTopics(
    @Query() query: FindAllGalleriesDto,
  ): Promise<InfinityPaginationResponseDto<Topic>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.galleriesService.findAllTopicsWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get('assets/tags')
  findAllTags() {
    const tags = this.galleriesService.findAllTags();
    console.log(tags);
    return tags;
  }

  @Get('assets/:topicId')
  @ApiParam({ name: 'topicId', type: String, required: true })
  @ApiOkResponse({ type: [Gallery] })
  findAssetByTopicId(@Param('topicId') topicId: string) {
    return this.galleriesService.findAssetByTopicId(topicId);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String, required: true })
  remove(@Param('id') id: string) {
    return this.galleriesService.remove(id);
  }
}
