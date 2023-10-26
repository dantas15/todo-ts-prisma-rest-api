import { z } from 'zod';

const idSchema = z.string().uuid();

const userSchema = z.object({
  id: idSchema.optional(),
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  isAdmin: z.boolean().optional(),
});

type User = z.infer<typeof userSchema>;

type EditUser = Omit<User, 'id'>;

type LoginUser = Omit<User, 'id' | 'name' | 'isAdmin'>;

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const resetPasswordSchema = z.object({
  email: z.string().email(),
  token: z.string(),
  password: z.string().min(8),
});

export {
  idSchema,
  userSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  loginSchema,
  User as ICreateUser,
  EditUser as IEditUser,
  LoginUser as ILoginUser,
};
