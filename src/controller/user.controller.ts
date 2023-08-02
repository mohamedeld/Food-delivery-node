import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import User from '../model/userModel';
import AppError from '../utils/appError';
interface IUserRequest extends express.Request {
  user: any;
}
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
  static async createUser(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const user = await User.create({
        name: request.body.name,
        email: request.body.email,
        phone: request.body.phone,
      });
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
  static async updateUser(
    request: IUserRequest,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const user = await User.findByIdAndUpdate(
        request.user.id,
        {
          name: request.body.name,
          email: request.body.email,
          phone: request.body.phone,
        },
        { new: true },
      );
      if (!user) {
        return next(
          new AppError('invalid user please check you logged in', 403),
        );
      }
      response.status(200).json({
        status: 'success',
        message: 'updated user successfully',
        data: {
          user,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  static async deleteUser(
    request: IUserRequest,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const user = await User.findByIdAndDelete(request.user.id);
      if (!user) {
        return next(
          new AppError('invalid user please check you logged in', 403),
        );
      }
      response.status(200).json({
        status: 'success',
        message: 'delete user successfully',
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }

  static async changeUserPassword(
    request: IUserRequest,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const user = await User.findByIdAndUpdate(
        request.user.id,
        {
          password: await bcrypt.hash(`${request.body.password}`, 10),
          passwordChangedAt: Date.now(),
        },
        { new: true },
      );
      if (!user) {
        return next(
          new AppError('invalid user please check you logged in', 403),
        );
      }
      response.status(200).json({
        status: 200,
        message: 'password changed successfully',
        data: {
          user,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
