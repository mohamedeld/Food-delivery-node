import { Router } from 'express';
import ResturantController from '../controller/resturantController';
import checkValidator from '../middleware/checkValidator.middleware';
import { AuthController } from '../controller/authController';
import {
  createResturant,
  getResturant,
  updateResturant,
  deleteResturant,
} from '../middleware/validator/resturantValidator';
class ResturantRouter {
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
    this.router
      .route('/')
      .get(checkValidator, ResturantController.getResturants);
    this.router
      .route('/:id')
      .get(getResturant, checkValidator, ResturantController.getResturant);
  }
  postRoutes() {
    this.router
      .route('/')
      .post(
        AuthController.protected,
        AuthController.allowedTo('admin'),
        ResturantController.uploadResturantImage,
        ResturantController.resizeImage,
        createResturant,
        checkValidator,
        ResturantController.createResturant,
      );
  }
  putRoutes() {}
  patchRoutes() {
    this.router.route('/:id').patch(
      AuthController.protected,
      AuthController.allowedTo('admin'),
      ResturantController.uploadResturantImage,
      ResturantController.resizeImage,

      updateResturant,
      checkValidator,
      ResturantController.updateResturant,
    );
  }
  deleteRoutes() {
    this.router
      .route('/:id')
      .delete(
        AuthController.protected,
        AuthController.allowedTo('admin'),
        deleteResturant,
        checkValidator,
        ResturantController.deleteResturant,
      );
  }
}

export default new ResturantRouter().router;
