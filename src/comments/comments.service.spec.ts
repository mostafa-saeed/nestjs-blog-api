import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { Schema } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

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

  findById(id) {
    const { path: index } = id;
    return this.comments.array[index];
  },

  updateOne(filter, updateQuery: any) {
    const {
      _id: { path: index },
    } = filter;
    Object.assign(this.comments.array[index], updateQuery);
  },

  deleteOne(query) {
    const {
      _id: { path: index },
    } = query;
    this.comments.array.splice(index, 1);
  },
};

describe('CommentsService', () => {
  let service: CommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: getModelToken('Comment'),
          useValue: commentModel,
        },
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
  });

  const DEFAULT_ID = new Schema.Types.ObjectId('0');

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should Add a comment', async () => {
    const comment = await service.create({
      content: 'testing',
      post: '60bce3c96378c80012267334',
    });

    expect(comment).toHaveProperty('_id');
  });

  it('should Find all comments', async () => {
    const comments = await service.findAll();

    expect(comments.length).toBe(1);
  });

  it('should Find single comment', async () => {
    const comment = await service.findOne(DEFAULT_ID);

    expect(comment.content).toBe('testing');
  });

  it('should Patch single comment', async () => {
    await service.patch(DEFAULT_ID, {
      content: 'done!',
    });
    const comment = await service.findOne(DEFAULT_ID);

    expect(comment.content).toBe('done!');
  });

  it('should Remove a single comment', async () => {
    await service.remove(DEFAULT_ID);
    const comments = await service.findAll();

    expect(comments.length).toBe(0);
  });
});
