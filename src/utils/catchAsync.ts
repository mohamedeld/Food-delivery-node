import { Request, Response, NextFunction } from "express";

const catchAstnc = (fn) => {
  return (request: Request, response: Response, next: NextFunction) => {
    fn(request, response, next).catch(next);
  };
};

export default catchAstnc;
