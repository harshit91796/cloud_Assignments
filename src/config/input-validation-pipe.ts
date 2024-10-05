import {
    ValidationPipe,
    BadRequestException,
    ValidationError,
    HttpStatus,
  } from '@nestjs/common';
  
  export const INPUT_VALIDATION_PIPE: ValidationPipe = new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: false,
    exceptionFactory: (
      validationErrors: ValidationError[],
    ): BadRequestException => {
      const [validationError] = validationErrors;
      const constraints = Object.values(validationError.constraints as object);
      const errorMessage = {
        message: constraints[0] || '',
        statusCode: HttpStatus.BAD_REQUEST,
        extensions: {
          code: 'validation-error',
        },
      };
      return new BadRequestException(errorMessage);
    },
  });
  