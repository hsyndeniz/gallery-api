import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateGalleryDto {
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'image' })
  type: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  path: string;
}
