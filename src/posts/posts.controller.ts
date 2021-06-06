import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { PostsService } from './posts.service';
import { ParseObjectIdPipe } from '../common/pipes/parseObjectId.pipe';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    const post = await this.postsService.findOne(id);
    if (!post) throw new NotFoundException('POST_NOT_FOUND');

    return post;
  }

  @Patch(':id')
  async patch(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    const post = await this.postsService.findOne(id);
    if (!post) throw new NotFoundException('POST_NOT_FOUND');

    return this.postsService.patch(id, updatePostDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
    @Body() createPostDto: CreatePostDto,
  ) {
    const post = await this.postsService.findOne(id);
    if (!post) throw new NotFoundException('POST_NOT_FOUND');

    return this.postsService.update(id, createPostDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    const post = await this.postsService.findOne(id);
    if (!post) throw new NotFoundException('POST_NOT_FOUND');

    return this.postsService.remove(id);
  }
}
