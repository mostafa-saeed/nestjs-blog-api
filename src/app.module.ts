import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

const { DB_CONNECTION_STRING } = process.env;

@Module({
  imports: [MongooseModule.forRoot(DB_CONNECTION_STRING)],
})
export class AppModule {}
