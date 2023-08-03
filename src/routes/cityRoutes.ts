import { Router } from 'express';
import { CityController } from '../controller/cityController';
import checkValidator from '../middleware/checkValidator.middleware';
import { AuthController } from '../controller/authController';
import {
  createCity,
  getCity,
  updateCity,
  deleteCity,
} from '../middleware/validator/cityValidator';
class CityRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.postRoutes();
    this.getRoutes();
    this.patchRoutes();
    this.putRoutes();
    this.deleteRoutes();
  }
  getRoutes() {
    this.router.route('/').get(checkValidator, CityController.getCities);
    this.router
      .route('/:id')
      .get(getCity, checkValidator, CityController.getCity);
  }
  postRoutes() {
    this.router
      .route('/')
      .post(
        AuthController.protected,
        AuthController.allowedTo('admin'),
        createCity,
        checkValidator,
        CityController.createCity,
      );
  }
  putRoutes() {}
  patchRoutes() {
    this.router
      .route('/:id')
      .patch(
        AuthController.protected,
        AuthController.allowedTo('admin'),
        updateCity,
        checkValidator,
        CityController.updateCity,
      );
  }
  deleteRoutes() {
    this.router
      .route('/:id')
      .delete(
        AuthController.protected,
        AuthController.allowedTo('admin'),
        deleteCity,
        checkValidator,
        CityController.deleteCity,
      );
  }
}

export default new CityRouter().router;
