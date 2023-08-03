import { Router } from 'express';
import CategoryController from '../controller/categoryController';
import checkValidator from '../middleware/checkValidator.middleware';
import { AuthController } from '../controller/authController';
import {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} from '../middleware/validator/categoryValidator';
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
    this.router
      .route('/')
      .get(checkValidator, CategoryController.getCategories);
    this.router
      .route('/:id')
      .get(getCategory, checkValidator, CategoryController.getCategory);
  }
  postRoutes() {
    this.router
      .route('/')
      .post(
        AuthController.protected,
        AuthController.allowedTo('admin'),
        CategoryController.uploadCategoryImage,
        CategoryController.resizeImage,
        createCategory,
        checkValidator,
        CategoryController.createCategory,
      );
  }
  putRoutes() {}
  patchRoutes() {
    this.router
      .route('/:id')
      .patch(
        AuthController.protected,
        AuthController.allowedTo('admin'),
        updateCategory,
        checkValidator,
        CategoryController.updateCategory,
      );
  }
  deleteRoutes() {
    this.router
      .route('/:id')
      .delete(
        AuthController.protected,
        AuthController.allowedTo('admin'),
        deleteCategory,
        checkValidator,
        CategoryController.deleteCategory,
      );
  }
}

export default new CityRouter().router;
