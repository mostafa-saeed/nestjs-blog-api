import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsService } from './posts.service';
import { CommentsService } from './comments/comments.service';
import { PostsController } from './posts.controller';
import { CommentsController } from './comments/comments.controller';

import { PostSchema } from './schemas/post.schema';
import { CommentSchema } from './comments/schemas/comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }]),
    MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]),
  ],
  controllers: [PostsController, CommentsController],
  providers: [PostsService, CommentsService],
})
export class BlogModule {}
