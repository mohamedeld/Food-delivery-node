import { validationResult } from 'express-validator';



export default (request,response,next)=>{
  const errors = validationResult(request).array();
  if (errors.length !== 0) {
    const errorString = errors.reduce((acc, obj) => acc + obj.msg, '');
    const error = new Error(errorString);
    next(error);
  }else{
    next(); 
  }
}