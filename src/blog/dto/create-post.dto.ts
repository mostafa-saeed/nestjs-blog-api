import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  @ApiProperty({
    example: 'Example Title',
    description: 'Title of article',
    format: 'string',
    minLength: 5,
    maxLength: 255,
  })
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Example content',
    description: 'Article content',
    format: 'string',
  })
  readonly content: string;
}
