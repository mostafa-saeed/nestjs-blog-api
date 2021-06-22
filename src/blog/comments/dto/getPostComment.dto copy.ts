import { IsNotEmpty, IsMongoId } from 'class-validator';

export class GetPostCommentDto {
  @IsNotEmpty()
  @IsMongoId()
  post: string;

  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
