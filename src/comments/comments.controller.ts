import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { GetIdDto } from '../common/dtos/getId.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: GetIdDto) {
    return this.commentsService.findOne(params.id);
  }

  @Patch(':id')
  update(
    @Param() params: GetIdDto,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.patch(params.id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param() params: GetIdDto) {
    return this.commentsService.remove(params.id);
  }
}
