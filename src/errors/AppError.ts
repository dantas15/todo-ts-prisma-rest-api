import { ZodError, typeToFlattenedError } from 'zod';
import { HttpStatusCode } from '@/controllers/protocols';

export class AppError {
  body: string | typeToFlattenedError<any>;
  statusCode: HttpStatusCode;

  constructor(
    body: string | ZodError,
    statusCode = HttpStatusCode.BAD_REQUEST
  ) {
    this.body = body instanceof ZodError ? body.flatten() : body;
    this.statusCode = statusCode;
  }
}
