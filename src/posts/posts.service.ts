import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  create(createPostDto: CreatePostDto) {
    return this.postModel.create(createPostDto);
  }

  findAll() {
    return this.postModel.find();
  }

  findOne(id: ObjectId) {
    return this.postModel.findById(id);
  }

  patch(id: ObjectId, updatePostDto: UpdatePostDto) {
    return this.postModel.updateOne({ _id: id }, updatePostDto);
  }

  update(id: ObjectId, createPostDto: CreatePostDto) {
    return this.postModel.findOneAndUpdate({ _id: id }, createPostDto);
  }

  remove(id: ObjectId) {
    return this.postModel.deleteOne({ _id: id });
  }
}
