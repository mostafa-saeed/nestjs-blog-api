import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { getModelToken } from '@nestjs/mongoose';

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

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getModelToken('Post'),
          useValue: postModel,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  const DEFAULT_ID = '0';

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should Add a single post', async () => {
    const post = await service.create({
      title: 'Test3',
      content: 'Hello World!',
    });

    expect(post).toHaveProperty('_id');
  });

  it('should Find all posts', async () => {
    const posts = await service.findAll();

    expect(posts.length).toBe(1);
  });

  it('should Find single post', async () => {
    const post = await service.findOne(DEFAULT_ID);

    expect(post.content).toBe('Hello World!');
  });

  it('should Patch single post', async () => {
    await service.patch(DEFAULT_ID, {
      content: 'done!',
    });
    const post = await service.findOne(DEFAULT_ID);
    expect(post.content).toBe('done!');
  });

  it('should Remove a single post', async () => {
    await service.remove(DEFAULT_ID);
    const posts = await service.findAll();

    expect(posts.length).toBe(0);
  });
});
