import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { GetPostDto } from './dto/getPost.dto';
import { GetPostCommentDto } from './dto/getPostComment.dto copy';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('Comments')
@Controller('posts/:post/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The comment has been successfully created.',
  })
  @ApiOperation({ summary: 'Creates a comment' })
  @ApiParam({
    name: 'post',
  })
  create(
    @Param() params: GetPostDto,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.create(createCommentDto, params.post);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'An array of comments.',
  })
  @ApiResponse({
    status: 404,
    description: 'No posts found with the id.',
  })
  @ApiOperation({ summary: 'Get post comments' })
  @ApiParam({
    name: 'post',
  })
  findAll(@Param() params: GetPostDto) {
    return this.commentsService.findByPost(params.post);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'A single comment.',
  })
  @ApiResponse({
    status: 404,
    description: 'No comments found with the id.',
  })
  @ApiOperation({ summary: 'Get a single comment' })
  @ApiParam({
    name: 'post',
  })
  @ApiParam({
    name: 'id',
  })
  async findOne(@Param() params: GetPostCommentDto) {
    const comment = await this.commentsService.findOne(params.id);
    if (!comment) throw new NotFoundException('COMMENT_NOT_FOUND');

    return comment;
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Success response',
  })
  @ApiResponse({
    status: 404,
    description: 'No comments found with the id.',
  })
  @ApiOperation({ summary: 'Patch a single comment' })
  @ApiParam({
    name: 'post',
  })
  @ApiParam({
    name: 'id',
  })
  async update(
    @Param() params: GetPostCommentDto,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const comment = await this.commentsService.findOne(params.id);
    if (!comment) throw new NotFoundException('COMMENT_NOT_FOUND');

    return this.commentsService.patch(params.id, updateCommentDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Success response',
  })
  @ApiResponse({
    status: 404,
    description: 'No comments found with the id.',
  })
  @ApiOperation({ summary: 'Delete a single comment' })
  @ApiParam({
    name: 'post',
  })
  @ApiParam({
    name: 'id',
  })
  async remove(@Param() params: GetPostCommentDto) {
    const comment = await this.commentsService.findOne(params.id);
    if (!comment) throw new NotFoundException('COMMENT_NOT_FOUND');

    return this.commentsService.remove(params.id);
  }
}
