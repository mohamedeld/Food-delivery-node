import { Request, Response, NextFunction } from 'express';
import express from 'express';
import * as bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../model/userModel';
import config from '../config';
import { Utils } from '../utils/Utils';
import AppError from '../utils/appError';

interface IUserRequest extends express.Request {
  user: any;
}

export class AuthController {
  static async signup(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const { name, email, password, confirmPassword } = request.body;
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await User.create({
        name,
        email,
        verification_token: Utils.generateVerificationToken(5),
        verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
        password: hashedPassword,
        confirmPassword,
      });
      console.log(password);
      const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRES_IN,
      });
      response.status(201).json({
        status: 'success',
        message: 'sign up successfully',
        data: {
          user,
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(request: Request, response: Response, next: NextFunction) {
    try {
      const { email, password } = request.body;
      const user = await User.findOne({ email });
      const isCorrectPassword = await bcrypt.compare(password, user.password);
      if (!isCorrectPassword) {
        throw new Error('email or password is incorrect');
      }
      const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRES_IN,
      });
      response.status(200).json({
        status: 'success',
        data: {
          user,
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async verify(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const { email, verification_token } = request.body;
      const user = await User.findOneAndUpdate(
        {
          email,
          verification_token,
          verification_token_time: { $gt: Date.now() },
        },
        {
          email_verified: true,
        },
        {
          new: true,
        },
      );
      if (!user) {
        return next(
          new AppError(
            'Email verification token is expiresd. please try again later.......',
            404,
          ),
        );
      }
      response.status(200).json({
        status: 'success',
        message: 'updated successfully',
        data: {
          user,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async protected(
    request: IUserRequest,
    response: Response,
    next: NextFunction,
  ) {
    try {
      let token: string;
      if (
        request.headers.authorization &&
        request.headers.authorization.startsWith('Bearer')
      ) {
        token = request.headers.authorization.split(' ')[1];
      }
      if (!token) {
        return next(new AppError('invalid token check you are logged', 403));
      }
      const decoded = jwt.verify(token, config.JWT_SECRET) as JwtPayload;
      if (!decoded) {
        return next(new AppError('invalid token check you are logged', 403));
      }
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next(
          new AppError('user with this token is no longer exist', 403),
        );
      }
      request.user = currentUser;
      next();
    } catch (error) {
      next(error);
    }
  }
  static allowedTo(...roles) {
    return (request: IUserRequest, response: Response, next: NextFunction) => {
      if (!roles.includes(request.user.role)) {
        return next(
          new AppError("you don't have permission for this role", 403),
        );
      }
      next();
    };
  }
}
