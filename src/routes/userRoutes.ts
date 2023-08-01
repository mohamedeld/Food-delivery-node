import { Router } from 'express';
import { UserController } from '../controller/user.controller';
import checkValidator from '../middleware/checkValidator.middleware';
import { AuthController } from '../controller/authController';

class UserRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();
    this.putRoutes();
    this.deleteRoutes();
  }
  getRoutes() {
    this.router
      .route('/')
      .get(
        AuthController.protected,
        AuthController.allowedTo('user'),
        checkValidator,
        UserController.getAllUsers,
      );

    this.router
      .route('/:id')
      .get(
        AuthController.protected,
        AuthController.allowedTo('user'),
        checkValidator,
        UserController.getUser,
      );
  }

  postRoutes() {}
  patchRoutes() {}
  putRoutes() {}
  deleteRoutes() {}
}

export default new UserRouter().router;
