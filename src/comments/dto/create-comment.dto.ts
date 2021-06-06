import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @IsMongoId()
  readonly post: string;
}
