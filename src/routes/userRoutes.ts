import { Router } from 'express';
import { UserController } from '../controller/user.controller';
import checkValidator from '../middleware/checkValidator.middleware';
import { AuthController } from '../controller/authController';
import { userChangePassword } from '../middleware/validator/userValidator';

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
  putRoutes() {
    this.router
      .route('/change-password/:id')
      .put(
        AuthController.protected,
        AuthController.allowedTo('user'),
        userChangePassword,
        checkValidator,
        UserController.changeUserPassword,
      );
  }
  deleteRoutes() {}
}

export default new UserRouter().router;
