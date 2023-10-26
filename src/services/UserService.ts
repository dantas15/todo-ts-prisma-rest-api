import { HttpStatusCode } from '@/controllers/protocols';
import { prisma } from '@/database';
import { AppError } from '@/errors/AppError';
import { ICreateUser, IEditUser, ILoginUser } from '@/models/User';
import bcrypt from 'bcrypt';
import MailConfig from '@/middlewares/MailConfig';
import { sign } from 'jsonwebtoken';

export const CreateUser = async (user: ICreateUser) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);

  const userExist = await prisma.user.findUnique({
    where: { email: user.email },
  });

  if (userExist) {
    throw new AppError('User already exists', HttpStatusCode.BAD_REQUEST);
  }

  const newUser = {
    ...user,
    password: hashedPassword,
  };

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

export const LoginUser = async (user: ILoginUser) => {
  const userExists = await prisma.user.findUnique({
    where: { email: user.email },
  });

  if (!userExists) {
    throw new AppError('User not found', HttpStatusCode.NOT_FOUND);
  }

  const passwordMatch = await bcrypt.compare(
    user.password,
    userExists.password
  );

  if (!passwordMatch) {
    throw new AppError('Invalid password', HttpStatusCode.NOT_FOUND);
  }

  const token = sign(
    { id: userExists.id, isAdmin: userExists.isAdmin },
    'secret',
    {
      expiresIn: '1d',
    }
  );

  return { user: userExists, token };
};

export const ForgotPassword = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError('User not found', HttpStatusCode.NOT_FOUND);
  }

  const recoveryToken = await bcrypt.hash(user.password, 10);

  const recoveryTokenExpiration = new Date();

  recoveryTokenExpiration.setHours(recoveryTokenExpiration.getHours() + 1);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      resetToken: recoveryToken,
      resetTokenExpiry: recoveryTokenExpiration,
    },
  });

  await MailConfig.sendMail({
    from: 'teste@ufla',
    to: user.email,
    subject: 'Password recovery',
    text: 'Your recovery token is: ' + recoveryToken,
  });

  return user;
};

export const ResetPassword = async (
  email: string,
  password: string,
  token: string
) => {
  const user = await prisma.user.findUnique({ where: { email: email } });

  if (!user) {
    throw new AppError('User not found', HttpStatusCode.NOT_FOUND);
  }

  if (user.resetToken !== token || !user.resetTokenExpiry) {
    throw new AppError('Invalid token', HttpStatusCode.NOT_FOUND);
  }

  const tokenExpired = new Date() > user.resetTokenExpiry;

  if (tokenExpired) {
    throw new AppError('Token expired', HttpStatusCode.NOT_FOUND);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    },
  });

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
