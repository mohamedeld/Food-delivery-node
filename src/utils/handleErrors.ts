import { NextFunction, Request, Response } from "express";
import config from "../config";
import Error from "../interfaces/error.interface";

const errorMiddleware = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || "something went wrong";
  if (config.NODE_ENV === "development") {
    response.status(status).json({
      status: status,
      message: message,
      error: error,
      stack: error.stack,
    });
  } else if (process.env.NODE_ENV === "production") {
    response.status(status).json({
      status,
      message,
    });
  }
};

export default errorMiddleware;
