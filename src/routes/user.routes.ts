import {Router } from 'express';
import { UserController } from '../controller/user.controller';
import checkValidator from "../utils/checkValidator";

const router = Router();
class UserRouter{
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
        this.router.get('/',checkValidator,UserController.login);
    }

    postRoutes(){}
    patchRoutes(){}
    putRoutes(){}
    deleteRoutes(){}
}

export default new UserRouter().router;

