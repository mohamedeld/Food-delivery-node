import {Router} from 'express';
import {createUserValidator} from '../middleware/validator/userValidator';
import { AuthController } from '../controller/authController';
class AuthRouter {
    public router:Router;
    constructor(){
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.putRoutes();
        this.deleteRoutes();
    } 
    getRoutes(){
        
    }

    postRoutes(){
        this.router.post('/signup',createUserValidator,AuthController.signup);
    }
    patchRoutes(){}
    putRoutes(){}
    deleteRoutes(){}
}
export default new AuthRouter().router;