import { prisma } from '@/database';

describe('User', () => {
  beforeAll(async () => {
    await prisma.$connect();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });
});
