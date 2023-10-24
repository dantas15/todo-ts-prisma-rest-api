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

type LoginUser = Pick<User, 'email' | 'password'>;

export {
  idSchema,
  userSchema,
  User as ICreateUser,
  EditUser as IEditUser,
  LoginUser as ILoginUser,
};
