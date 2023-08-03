import { Request, Response, NextFunction } from 'express';
import City from '../model/cityModel';
import AppError from '../utils/appError';
export class CityController {
  static async createCity(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const city = await City.create(request.body);
      response.status(200).json({
        status: 'success',
        data: {
          city,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  static async getCities(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const cities = await City.find();
      response.status(200).json({
        status: 'success',
        data: {
          cities,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  static async getCity(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const city = await City.findById(request.params.id);
      if (!city) {
        return next(new AppError('invalid id', 401));
      }
      response.status(200).json({
        status: 'success',
        data: {
          city,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  static async updateCity(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const city = await City.findByIdAndUpdate(
        request.params.id,
        request.body,
        { new: true },
      );
      if (!city) {
        return next(new AppError('invalid id', 401));
      }
      response.status(200).json({
        status: 'success',
        data: {
          city,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  static async deleteCity(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const city = await City.findByIdAndDelete(request.params.id);
      if (!city) {
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
