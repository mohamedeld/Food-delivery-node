import { NextFunction, Request, Response } from 'express';

interface CustomError extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
}

const sendErrorForDevelopment = (err: CustomError, response: Response) => {
  response.status(err.statusCode || 500).json({
    status: err.status || 'error',
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorForProduction = (err: CustomError, response: Response) => {
  if (err.isOperational) {
    response.status(err.statusCode || 500).json({
      status: err.status || 'error',
      message: err.message,
    });
  }
};

export default (err: CustomError, request: Request, response: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorForDevelopment(err, response);
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorForProduction(err, response);
  }
};