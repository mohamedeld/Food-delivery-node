import { Request, Response, NextFunction } from 'express';
import User from '../model/userModel';
import AppError from '../utils/appError';

export class UserController {
  static async getAllUsers(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const users = await User.find();
      response.status(200).json({
        status: 'success',
        data: {
          users,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  static async getUser(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const user = await User.findById(request.params.id);
      if (!user) {
        return next(new AppError('invalid user please try again', 402));
      }
      response.status(200).json({
        status: 'success',
        data: {
          user,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
