import { HttpStatusCode } from '@/controllers/protocols';
import { prisma } from '@/database';
import { AppError } from '@/errors/AppError';
import { ICreateUser, IEditUser } from '@/models/User';
import bcrypt from 'bcrypt';

export const CreateUser = async (user: ICreateUser) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);

  const newUser = {
    ...user,
    password: hashedPassword,
  };

  const userExist = await prisma.user.findUnique({
    where: { email: newUser.email },
  });

  if (userExist) {
    throw new AppError('User already exists', HttpStatusCode.BAD_REQUEST);
  }

  return await prisma.user.create({ data: newUser });
};

export const EditUser = async (id: string, user: IEditUser) => {
  const userExist = await prisma.user.findUnique({
    where: { email: user.email },
  });

  if (userExist) {
    throw new AppError('User already exists', HttpStatusCode.BAD_REQUEST);
  }

  const hashedPassword = await bcrypt.hash(user.password, 10);

  user.password = hashedPassword;

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

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError('Invalid password', HttpStatusCode.NOT_FOUND);
  }

  return user;
};

export const ForgotPassword = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError('User not found', HttpStatusCode.NOT_FOUND);
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
