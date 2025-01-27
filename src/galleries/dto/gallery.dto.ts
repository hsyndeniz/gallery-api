import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GalleryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
