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
  }
  patchRoutes() {
    this.router.patch(
      '/verify',
      verifyUserEmail,
      validate,
      AuthController.verify,
    );
  }
  putRoutes() {}
  deleteRoutes() {}
}
export default new AuthRouter().router;
