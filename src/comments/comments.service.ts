import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment, CommentDocument } from './schemas/comment.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  create(createCommentDto: CreateCommentDto) {
    return this.commentModel.create(createCommentDto);
  }

  findAll() {
    return this.commentModel.find().populate('post');
  }

  findOne(id: ObjectId) {
    return this.commentModel.findById(id);
  }

  findByPost(postID) {
    return this.commentModel.find({
      post: postID,
    });
  }

  patch(id: ObjectId, updateCommentDto: UpdateCommentDto) {
    return this.commentModel.updateOne({ _id: id }, updateCommentDto);
  }

  remove(id: ObjectId) {
    return this.commentModel.deleteOne({ _id: id });
  }
}
