import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = 500;
    let error = {};
    let message = 'An error occurred';

    if (exception?.getStatus) {
      status = exception.getStatus();
      message = exception?.response?.error || 'Internal server error';
    }

    if (exception && exception.response && !exception.response.message) {
      error = [exception?.response];
    }

    if (exception && exception?.response?.message) {
      error = [exception?.response?.message];
    }

    console.log(exception);

    response.status(status).json({
      status: false,
      code: status,
      message,
      payload: [{ error }],
    });
  }
}
