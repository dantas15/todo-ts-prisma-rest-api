import { prisma } from '@/database';
import { app } from '@/server';
import request from 'supertest';
import { execSync } from 'child_process';
import { Context, MockContext, createMockContext } from '@/jest.context';

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});

describe('User', () => {
  it('should create a new user', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    };

    mockCtx.prisma.user.create.mockResolvedValue(newUser);

    const response = await request(app)
      .post('/users')
      .send(newUser)
      .expect(201);

    expect(response.body).toMatchObject(newUser);
  });
});
