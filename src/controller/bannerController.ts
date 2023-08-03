import Banner from '../model/bannerModel';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';
import { uploadSingleImage } from '../utils/uploadImg';
import AppError from '../utils/appError';
// interface CustomRequest extends Request{
//     file:Express.Multer.File;
// }

class BannerController {
  static uploadBannerImage = uploadSingleImage('image');

  static async resizeImage(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const fileName = `banner-${uuidv4()}-${Date.now()}.jpeg`;
      await sharp(request.file.buffer)
        .resize(600, 600)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`./src/uploads/banner/${fileName}`);
      request.body.image = fileName;
      next();
    } catch (error) {
      next(error);
    }
  }
  static async createBanner(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const banner = await Banner.create(request.body);
      response.status(200).json({
        status: 'success',
        data: {
          banner,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  static async getBanners(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const banners = await Banner.find();
      response.status(200).json({
        status: 'success',
        data: {
          banners,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  static async getBanner(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const banner = await Banner.findById(request.params.id);
      if (!banner) {
        return next(new AppError('invalid id', 401));
      }
      response.status(200).json({
        status: 'success',
        data: {
          banner,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  static async updateBanner(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const banner = await Banner.findByIdAndUpdate(
        request.params.id,
        request.body,
        { new: true },
      );
      if (!banner) {
        return next(new AppError('invalid id', 401));
      }
      response.status(200).json({
        status: 'success',
        data: {
          banner,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  static async deleteBanner(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const banner = await Banner.findByIdAndDelete(request.params.id);
      if (!banner) {
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

export default BannerController;
