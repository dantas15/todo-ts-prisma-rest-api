import { NextFunction, Request, Response, Router } from 'express';
import { TaskController } from '@/controllers/TaskController';
import { AppError } from '@/errors/AppError';

const router = Router();

router.use('/tasks', TaskController);

// using express-async-errors to intercept errors
router.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        body: err.body,
      });
    }

    return response.status(500).json({
      status: 'Error',
      body: `Internal server error ${err.message}`,
    });
  }
);

export { router };
