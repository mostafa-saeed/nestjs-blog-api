import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModule } from './blog/blog.module';

const { DB_CONNECTION_STRING } = process.env;

@Module({
  imports: [MongooseModule.forRoot(DB_CONNECTION_STRING), BlogModule],
})
export class AppModule {}
