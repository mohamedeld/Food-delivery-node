
import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import { getEnvironmentVariable } from './environment/environment';
import userRouter from './routes/userRoutes';
import globalHandleError from './utils/handleErrors';
import bodyParser from 'body-parser';
import authRouter from './routes/authRoutes';
import dotenv from 'dotenv';

export class Server {
    public app:express.Application = express();
    constructor(){
        
        this.setConfigs();
        this.setRoutes();
        this.error404Handler();
        this.errorHandler()
    }   
    setConfigs(){
        this.configureDotenv();
        this.configureBodyParser();
        this.connectMongoDB();
        
    }
    configureDotenv(){
        dotenv.config({path:`${__dirname}/.env`});
    }
    connectMongoDB(){
        mongoose.connect(process.env.DB_URI,{
            useNewUrlParser: true,

            family:4
        }as ConnectOptions).then(()=> console.log(`Connect Mongo DB to ${process.env.DB_URI}`)).catch(err=> console.log(err));
    }
    configureBodyParser(){
        this.app.use(bodyParser.urlencoded({extended:false}));
    }
    
    setRoutes(){
        this.app.use('/api/v1/auth',authRouter);
        this.app.use('/api/v1/users',userRouter);
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