import { Request, Response, NextFunction } from 'express';


const catchAstnc =  (fn) => {
  return (request, response, next) => {
    fn(request, response, next).catch(next);
  };
};   

export default catchAstnc;