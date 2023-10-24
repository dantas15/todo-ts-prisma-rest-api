import { NextFunction, Request, Response } from 'express';
import { AppError } from '@/errors/AppError';

export default function IsAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const { isAdmin } = request.user;

  if (!isAdmin) {
    throw new AppError('User is not admin');
  }

  return next();
}
