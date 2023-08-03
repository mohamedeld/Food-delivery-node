import express, { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import Resturnat from '../model/resturantModel';
import AppError from '../utils/appError';
import { uploadSingleImage } from '../utils/uploadImg';
interface IUserRequest extends express.Request {
  user: any;
}
class ResturantController {
  static uploadResturantImage = uploadSingleImage('image');
  static async resizeImage(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const fileName = `resturant-${uuidv4()}-${Date.now()}.jpeg`;
      await sharp(request.file.buffer)
        .resize(600, 600)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`./src/uploads/resturants/${fileName}`);
      request.body.image = fileName;
      next();
    } catch (error) {
      next(error);
    }
  }
  static async createResturant(
    request: IUserRequest,
    response: Response,
    next: NextFunction,
  ) {
    try {
      if (!request.body.user_id) request.body.user_id = request.user.id;
      const resutrant = await Resturnat.create(request.body);
      response.status(200).json({
        status: 'success',
        data: {
          resutrant,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  static async getResturants(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const resturants = await Resturnat.find();
      response.status(200).json({
        status: 'success',
        data: {
          resturants,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  static async getResturant(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const resturant = await Resturnat.findById(request.params.id);
      if (!resturant) {
        return next(new AppError('invalid id', 401));
      }
      response.status(200).json({
        status: 'success',
        data: {
          resturant,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  static async updateResturant(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const resturant = await Resturnat.findByIdAndUpdate(
        request.params.id,
        request.body,
        { new: true },
      );
      if (!resturant) {
        return next(new AppError('invalid id', 401));
      }
      response.status(200).json({
        status: 'success',
        data: {
          resturant,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  static async deleteResturant(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const resturant = await Resturnat.findByIdAndDelete(request.params.id);
      if (!resturant) {
        return next(new AppError('invalid id', 401));
      }
      response.status(200).json({
        status: 'success',
        message: 'deleted successfully',
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default ResturantController;
