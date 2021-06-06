import { ObjectId } from 'mongoose';
import { IsNotEmpty, IsMongoId } from 'class-validator';

export class GetIdDto {
  @IsNotEmpty()
  @IsMongoId()
  id: ObjectId;
}
