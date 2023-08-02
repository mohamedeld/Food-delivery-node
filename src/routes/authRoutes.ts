import { Router } from 'express';
import {
  createUserValidator,
  loginValidator,
  verifyUserEmail,
} from '../middleware/validator/userValidator';
import validate from '../middleware/checkValidator.middleware';
import { AuthController } from '../controller/authController';
class AuthRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();
    this.putRoutes();
    this.deleteRoutes();
  }
  getRoutes() {}

  postRoutes() {
    this.router.post(
      '/signup',
      createUserValidator,
      validate,
      AuthController.signup,
    );
    this.router.post('/login', loginValidator, validate, AuthController.login);
    this.router
      .route('/forget-password')
      .post(
        AuthController.protected,
        AuthController.allowedTo('user'),
        AuthController.forgetPassword,
      );
    this.router
      .route('/verify-reset-code')
      .post(
        AuthController.protected,
        AuthController.allowedTo('user'),
        AuthController.verifyRestCode,
      );
  }
  patchRoutes() {
    this.router.patch(
      '/verify',
      verifyUserEmail,
      validate,
      AuthController.verify,
    );
  }
  putRoutes() {
    this.router
      .route('/reset-password')
      .put(
        AuthController.protected,
        AuthController.allowedTo('user'),
        AuthController.resetPassword,
      );
  }
  deleteRoutes() {}
}
export default new AuthRouter().router;
