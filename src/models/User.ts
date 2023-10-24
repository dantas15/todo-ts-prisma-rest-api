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

export { idSchema, userSchema, User as ICreateUser, EditUser as IEditUser };

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type Login = z.infer<typeof loginSchema>;

export { loginSchema, Login };
