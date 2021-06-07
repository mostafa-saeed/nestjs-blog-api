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
import { ApiTags, ApiResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CommentsService } from '../comments/comments.service';
import { GetIdDto } from '../common/dtos/getId.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created.',
  })
  @ApiOperation({ summary: 'Creates a post' })
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'An array of posts.',
  })
  @ApiOperation({ summary: 'List blog posts' })
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'A single post.',
  })
  @ApiResponse({
    status: 404,
    description: 'No posts found with the id.',
  })
  @ApiOperation({ summary: 'Get a single post' })
  @ApiParam({
    name: 'id',
  })
  async findOne(@Param() params: GetIdDto) {
    const post = await this.postsService.findOne(params.id);
    if (!post) throw new NotFoundException('POST_NOT_FOUND');

    return post;
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Success response',
  })
  @ApiResponse({
    status: 404,
    description: 'No posts found with the id.',
  })
  @ApiOperation({ summary: 'Patch a single post' })
  @ApiParam({
    name: 'id',
  })
  async patch(@Param() params: GetIdDto, @Body() updatePostDto: UpdatePostDto) {
    const post = await this.postsService.findOne(params.id);
    if (!post) throw new NotFoundException('POST_NOT_FOUND');

    return this.postsService.patch(params.id, updatePostDto);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Success response',
  })
  @ApiResponse({
    status: 404,
    description: 'No posts found with the id.',
  })
  @ApiOperation({ summary: 'Update a single post' })
  @ApiParam({
    name: 'id',
  })
  async update(
    @Param() params: GetIdDto,
    @Body() createPostDto: CreatePostDto,
  ) {
    const post = await this.postsService.findOne(params.id);
    if (!post) throw new NotFoundException('POST_NOT_FOUND');

    return this.postsService.update(params.id, createPostDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Success response',
  })
  @ApiResponse({
    status: 404,
    description: 'No posts found with the id.',
  })
  @ApiOperation({ summary: 'Delete a single post' })
  @ApiParam({
    name: 'id',
  })
  async remove(@Param() params: GetIdDto) {
    const post = await this.postsService.findOne(params.id);
    if (!post) throw new NotFoundException('POST_NOT_FOUND');

    return this.postsService.remove(params.id);
  }

  @Get(':id/comments')
  @ApiResponse({
    status: 200,
    description: 'Success response',
  })
  @ApiResponse({
    status: 404,
    description: 'No posts found with the id.',
  })
  @ApiOperation({ summary: 'Post comments array' })
  @ApiParam({
    name: 'id',
  })
  async findOneComments(@Param() params: GetIdDto) {
    const post = await this.postsService.findOne(params.id);
    if (!post) throw new NotFoundException('POST_NOT_FOUND');

    const comments = await this.commentsService.findByPost(params.id);

    return comments;
  }
}
