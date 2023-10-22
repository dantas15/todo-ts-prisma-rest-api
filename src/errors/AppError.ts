import { HttpStatusCode } from '@/controllers/protocols';

export class AppError {
  body: string;
  statusCode: HttpStatusCode;

  constructor(body: string, statusCode = HttpStatusCode.BAD_REQUEST) {
    this.body = body;
    this.statusCode = statusCode;
  }
}
