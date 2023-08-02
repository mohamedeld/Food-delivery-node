import { Request, Response, NextFunction } from 'express';
import express from 'express';
import crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../model/userModel';
import config from '../config';
import { Utils } from '../utils/Utils';
import AppError from '../utils/appError';
import sendEmail from '../utils/NodeMailer';

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
      if (currentUser.passwordChangedAt) {
        const convertDateToTimestamp = Number(
          currentUser.passwordChangedAt.getTime() / 1000,
        );
        if (convertDateToTimestamp > decoded.iat) {
          response.status(401).json({
            status: 'fail',
            message: 'the user change his password please login again',
          });
        }
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
  static async forgetPassword(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const user = await User.findOne({ email: request.body.email });
      if (!user) {
        return next(new AppError('invalid email please sign up', 403));
      }
      const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
      const hashedResetCode = crypto
        .createHash('sha256')
        .update(resetCode)
        .digest('hex');
      user.passwordResetCode = hashedResetCode;
      user.passwordResetExpires = new Date(Date.now() + 15 * 60 * 1000);
      user.passwordResetVerified = false;
      await user.save({ validateBeforeSave: false });
      try {
        await sendEmail({
          email: user.email,
          subject: 'your password reset code (valid for 10 minutes)',
          text: `HI, ${user.name} your reset code ${resetCode}`,
        });
        response.status(200).json({
          status: 'success',
          message:
            'reset code is sent to your email and rest code is valid for 15 minutes',
        });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }
  static async verifyRestCode(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const hashResetCode = crypto
        .createHash('sha256')
        .update(request.body.resetCode)
        .digest('hex');
      const user = await User.findOne({
        passwordResetCode: hashResetCode,
        passwordResetExpires: { $gt: Date.now() },
      });
      if (!user) {
        return next(new AppError('invalid reset code try again later...', 404));
      }
      user.passwordResetVerified = true;
      await user.save();
      response.status(200).json({
        status: 'success',
      });
    } catch (error) {
      next(error);
    }
  }
  static async resetPassword(
    request: IUserRequest,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const user = await User.findById(request.user.id);
      if (!user) {
        return next(new AppError('User not found', 404));
      }
      if (!user.passwordResetVerified) {
        return next(
          new AppError('reset code is invalid check your reset code', 400),
        );
      }

      user.password = request.body.password;
      user.confirmPassword = request.body.confirmPassword;
      user.passwordResetCode = undefined;
      user.passwordResetExpires = undefined;
      user.passwordResetVerified = undefined;
      await user.save();
      const token = jwt.sign({ id: user.id }, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRES_IN,
      });
      response.status(200).json({
        token,
      });
      await user.save();
    } catch (error) {
      next(error);
    }
  }
}
