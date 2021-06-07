import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Some text',
    description: 'Comment content',
    format: 'string',
  })
  readonly content: string;

  @IsMongoId()
  @ApiProperty({
    example: '60bdfe5d37160200b8e0bb27',
    description: 'Post id',
    format: 'string',
  })
  readonly post: string;
}
