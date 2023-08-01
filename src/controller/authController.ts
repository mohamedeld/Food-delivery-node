import { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/userModel";
import config from "../config";
import { nextTick } from "process";
export class AuthController {
  static signup = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { name, email, password, confirmPassword } = request.body;
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        confirmPassword,
      });
      console.log(password);
      const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRES_IN,
      });
      response.status(201).json({
        status: "success",
        message: "sign up successfully",
        data: {
          user,
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  static login = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password } = request.body;
      const user = await User.findOne({ email });
      const isCorrectPassword = await bcrypt.compare(password, user.password);
      if (!isCorrectPassword) {
        throw new Error("email or password is incorrect");
      }
      const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRES_IN,
      });
      response.status(200).json({
        status: "success",
        data: {
          user,
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  };
}
