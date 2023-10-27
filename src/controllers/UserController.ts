import {
  CreateUser,
  EditUser,
  GetUsers,
  GetUser,
  DeleteUser,
  LoginUser,
  ForgotPassword,
  ResetPassword,
} from '@/services/UserService';
import { Router } from 'express';
import {
  userSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  loginSchema,
} from '@/models/User';
import { AppError } from '@/errors/AppError';

const routes = Router();

routes.get('/', async (req, res) => {
  res.send(await GetUsers());
});

routes.get('/:id', async (req, res) => {
  res.send(await GetUser(req.params.id));
});

routes.post('/', async (req, res) => {
  const body = req.body;

  const validatedBody = userSchema.safeParse(body);

  if (!validatedBody.success) {
    throw new AppError(validatedBody.error);
  }

  const createdUser = await CreateUser(validatedBody.data);

  return res.status(201).send(createdUser);
});

routes.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  const validatedBody = forgotPasswordSchema.safeParse(req.body);

  if (!validatedBody.success) {
    throw new AppError(validatedBody.error);
  }

  res.send(await ForgotPassword(email));
});

routes.post('/reset-password', async (req, res) => {
  const { email, password, token } = req.body;

  const validatedBody = resetPasswordSchema.safeParse(req.body);

  if (!validatedBody.success) {
    throw new AppError(validatedBody.error);
  }

  res.send(await ResetPassword(email, password, token));
});

routes.post('/login', async (req, res) => {
  const user = req.body;

  const validatedBody = loginSchema.safeParse(user);

  if (!validatedBody.success) {
    throw new AppError(validatedBody.error);
  }

  res.send(await LoginUser(user));
});

routes.put('/:id', async (req, res) => {
  const body = req.body;

  const validatedBody = userSchema.safeParse(body);

  if (!validatedBody.success) {
    throw new AppError(validatedBody.error);
  }

  res.send(await EditUser(req.params.id, req.body));
});

routes.delete('/:id', async (req, res) => {
  res.send(await DeleteUser(req.params.id));
});

export { routes as UserController };
