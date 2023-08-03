import express, { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import Category from '../model/categoryModel';
import AppError from '../utils/appError';
import { uploadSingleImage } from '../utils/uploadImg';
interface IUserRequest extends express.Request {
  user: any;
}
class CategoryController {
  static uploadCategoryImage = uploadSingleImage('image');
  static async resizeImage(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const fileName = `category-${uuidv4()}-${Date.now()}.jpeg`;
      await sharp(request.file.buffer)
        .resize(600, 600)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`./src/uploads/categories/${fileName}`);
      request.body.image = fileName;
      next();
    } catch (error) {
      next(error);
    }
  }
  static async createCategory(
    request: IUserRequest,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const category = await Category.create({
        user_id: request.user.id,
        name: request.body.name,
      });
      response.status(200).json({
        status: 'success',
        data: {
          category,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  static async getCategories(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const categories = await Category.find();
      response.status(200).json({
        status: 'success',
        data: {
          categories,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  static async getCategory(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const category = await Category.findById(request.params.id);
      if (!category) {
        return next(new AppError('invalid id', 401));
      }
      response.status(200).json({
        status: 'success',
        data: {
          category,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  static async updateCategory(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const category = await Category.findByIdAndUpdate(
        request.params.id,
        request.body,
        { new: true },
      );
      if (!category) {
        return next(new AppError('invalid id', 401));
      }
      response.status(200).json({
        status: 'success',
        data: {
          category,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  static async deleteCategory(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const category = await Category.findByIdAndDelete(request.params.id);
      if (!category) {
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

export default CategoryController;
