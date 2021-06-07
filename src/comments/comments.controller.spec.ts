import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

const commentModel = {
  comments: {
    array: [],
    populate() {
      return this.array;
    },
  },

  create(comment) {
    comment = {
      ...comment,
      _id: this.comments.length,
    };

    this.comments.array.push(comment);

    return comment;
  },

  find() {
    return this.comments;
  },

  findById(id: string) {
    return this.comments.array[id];
  },

  updateOne(filter: { _id: string }, updateQuery: any) {
    const { _id } = filter;
    Object.assign(this.comments.array[_id], updateQuery);
  },

  deleteOne(query: { _id: string }) {
    const { _id } = query;
    this.comments.array.splice(_id, 1);
  },
};

describe('CommentsController', () => {
  let controller: CommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [
        CommentsService,
        {
          provide: getModelToken('Comment'),
          useValue: commentModel,
        },
      ],
    }).compile();

    controller = module.get<CommentsController>(CommentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
