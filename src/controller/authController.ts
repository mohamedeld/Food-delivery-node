import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/userModel";
import catchAsync from "../utils/catchAsync";

export class AuthController {
  static signup = catchAsync(
    async (request: Request, response: Response, next: NextFunction) => {
      const user = await User.create(request.body);
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES,
        }
      );
      response.status(201).json({
        status: "success",
        message: "sign up successfully", 
        data: {
          user,
          token,
        },
      });
    }
  );
}
