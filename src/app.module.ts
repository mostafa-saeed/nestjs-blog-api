import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';

const { DB_CONNECTION_STRING } = process.env;

@Module({
  imports: [
    MongooseModule.forRoot(DB_CONNECTION_STRING),
    PostsModule,
    CommentsModule,
  ],
})
export class AppModule {}
