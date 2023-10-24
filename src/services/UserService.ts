import { HttpStatusCode } from '@/controllers/protocols';
import { prisma } from '@/database';
import { AppError } from '@/errors/AppError';
import { ICreateUser, IEditUser } from '@/models/User';

export const CreateUser = async (user: ICreateUser) => {
  return await prisma.user.create({ data: user });
};

export const EditUser = async (id: string, user: IEditUser) => {
  return await prisma.user.update({ where: { id }, data: user });
};

export const GetUsers = async () => {
  return await prisma.user.findMany();
};

export const LoginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError('User not found', HttpStatusCode.NOT_FOUND);
  }

  if (user.password !== password) {
    throw new AppError('Invalid password', HttpStatusCode.NOT_FOUND);
  }

  return user;
};

export const GetUser = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    throw new AppError('User not found', HttpStatusCode.NOT_FOUND);
  }

  return user;
};

export const DeleteUser = async (id: string) => {
  return await prisma.user.delete({ where: { id } });
};
