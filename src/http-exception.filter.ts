import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ConflictException,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(Error)
export class GlobalExceptionsFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status: number;
    let error:string;
    const forbiddenRegex = /forbidden/i;
    if (exception instanceof UnauthorizedException && !forbiddenRegex.test(exception.name)) {
      status = 401;
      error = 'UnauthorizedException Error';
    } else if (exception instanceof BadRequestException) {
      status = 400;
      error = 'BadRequestException Error';
    } else if (exception instanceof NotFoundException) {
      status = 404;
      error = 'NotFoundException Error';
    } else if (forbiddenRegex.test(exception.name)) {
      status = 403;
      error = 'ForbiddenException Error';
    } else if (exception instanceof ConflictException) {
      status = 409;
      error = 'ConflictException Error';
    } else if (exception instanceof HttpException) {
      status = (exception as HttpException).getStatus();
      error = 'HttpException Error';
    } else {
      status = 500;
      error = 'InternalServerErrorException';
    }

    response.status(status).json({
      status: status,
      message: exception.message,
      error: error,
    });
  }
}