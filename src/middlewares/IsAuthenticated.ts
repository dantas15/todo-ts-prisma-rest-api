import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';
import { any } from 'zod';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
  isAdmin: boolean;
}

export default function IsAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = verify(token, 'secret');

    const { sub, isAdmin } = decodedToken as ITokenPayload;

    request.user = {
      id: sub,
      isAdmin: isAdmin,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token');
  }
}
