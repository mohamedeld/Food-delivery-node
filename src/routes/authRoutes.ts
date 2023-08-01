import { Router } from "express";
import {
  createUserValidator,
  loginValidator,
} from "../middleware/validator/userValidator";
import { AuthController } from "../controller/authController";
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
    this.router.post("/signup", createUserValidator, AuthController.signup);
    this.router.post("/login", loginValidator, AuthController.login);
  }
  patchRoutes() {}
  putRoutes() {}
  deleteRoutes() {}
}
export default new AuthRouter().router;
