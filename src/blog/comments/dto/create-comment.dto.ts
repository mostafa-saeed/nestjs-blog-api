import { IsNotEmpty, IsString } from 'class-validator';
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
}
