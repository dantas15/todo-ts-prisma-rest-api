import { MockContext, Context, createMockContext } from '@/jest.context';

let mockCtx: MockContext;
let ctx: Context;

beforeAll(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});
