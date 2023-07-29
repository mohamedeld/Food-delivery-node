import { Request, Response, NextFunction } from 'express';
import { validationResult, Result, ValidationError } from 'express-validator';

const checkValidator = (request: Request, response: Response, next: NextFunction) => {
  const result: Result<ValidationError> = validationResult(request);
  if (!result.isEmpty()) {
    const errorString = result.array().map((obj: ValidationError) => obj.msg).join('');
    const error: Error & { statusCode?: number } = new Error(errorString);
    error.statusCode = 502;

    next(error);
  } else {
    next();
  }
};

export default checkValidator;