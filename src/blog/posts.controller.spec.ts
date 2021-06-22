import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { CommentsService } from './comments/comments.service';

const postModel = {
  posts: [],

  create(post) {
    post = {
      ...post,
      _id: this.posts.length,
    };

    this.posts.push(post);

    return post;
  },

  find() {
    return this.posts;
  },

  findById(id: string) {
    return this.posts[id];
  },

  updateOne(filter: { _id: string }, updateQuery: any) {
    const { _id } = filter;
    Object.assign(this.posts[_id], updateQuery);
  },

  deleteOne(query: { _id: string }) {
    const { _id } = query;
    this.posts.splice(_id, 1);
  },
};

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

describe('PostsController', () => {
  let controller: PostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        PostsService,
        CommentsService,
        {
          provide: getModelToken('Post'),
          useValue: postModel,
        },
        {
          provide: getModelToken('Comment'),
          useValue: commentModel,
        },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
