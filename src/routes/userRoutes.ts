import {Router } from 'express';
import { UserController } from '../controller/user.controller';

import {createUserValidator} from '../middleware/validator/userValidator';

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
        
    }

    postRoutes(){
        
    }
    patchRoutes(){}
    putRoutes(){}
    deleteRoutes(){}
}

export default new UserRouter().router;

