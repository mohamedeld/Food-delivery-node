import express from 'express';
import mongoose from 'mongoose';
import { getEnvironmentVariable } from './environment/environment';
import userRoutes from './routes/user.routes';
import globalHandleError from './utils/handleErrors';
export class Server {
    public app:express.Application = express();
    constructor(){
        this.setConfigs();
        this.setRoutes();
        this.error404Handler();
        this.errorHandler()
    }   
    setConfigs(){
        this.connectMongoDB();
    }
    connectMongoDB(){
        mongoose.connect(getEnvironmentVariable().db_uri).then(()=> console.log(`Connect Mongo DB to ${getEnvironmentVariable().db_uri}`)).catch(err=> console.log(err));
    }
    setRoutes(){
        this.app.use('/api/v1/users',userRoutes);
    }
    error404Handler(){
        this.app.use((request,response,next)=>{
            response.status(404).json({
                status:404,
                message:'Not Found'
            })
        })
    }
    errorHandler(){
        this.app.use(globalHandleError);
    }
    
}