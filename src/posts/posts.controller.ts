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
import { PostsService } from './posts.service';
import { CommentsService } from '../comments/comments.service';
import { GetIdDto } from '../common/dtos/getId.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: GetIdDto) {
    const post = await this.postsService.findOne(params.id);
    if (!post) throw new NotFoundException('POST_NOT_FOUND');

    return post;
  }

  @Patch(':id')
  async patch(@Param() params: GetIdDto, @Body() updatePostDto: UpdatePostDto) {
    const post = await this.postsService.findOne(params.id);
    if (!post) throw new NotFoundException('POST_NOT_FOUND');

    return this.postsService.patch(params.id, updatePostDto);
  }

  @Put(':id')
  async update(
    @Param() params: GetIdDto,
    @Body() createPostDto: CreatePostDto,
  ) {
    const post = await this.postsService.findOne(params.id);
    if (!post) throw new NotFoundException('POST_NOT_FOUND');

    return this.postsService.update(params.id, createPostDto);
  }

  @Delete(':id')
  async remove(@Param() params: GetIdDto) {
    const post = await this.postsService.findOne(params.id);
    if (!post) throw new NotFoundException('POST_NOT_FOUND');

    return this.postsService.remove(params.id);
  }

  @Get(':id/comments')
  async findOneComments(@Param() params: GetIdDto) {
    const post = await this.postsService.findOne(params.id);
    if (!post) throw new NotFoundException('POST_NOT_FOUND');

    const comments = await this.commentsService.findByPost(params.id);

    return comments;
  }
}
