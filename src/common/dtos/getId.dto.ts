import { IsNotEmpty, IsMongoId } from 'class-validator';

export class GetIdDto {
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
