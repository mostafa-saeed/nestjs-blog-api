import { IsNotEmpty, IsMongoId } from 'class-validator';

export class GetPostDto {
  @IsNotEmpty()
  @IsMongoId()
  post: string;
}
