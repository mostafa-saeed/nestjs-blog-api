import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
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

  findOne(id: string) {
    return this.postModel.findById(id);
  }

  patch(id: string, updatePostDto: UpdatePostDto) {
    return this.postModel.updateOne({ _id: id }, updatePostDto);
  }

  update(id: string, createPostDto: CreatePostDto) {
    return this.postModel.findOneAndUpdate({ _id: id }, createPostDto);
  }

  remove(id: string) {
    return this.postModel.deleteOne({ _id: id });
  }
}
