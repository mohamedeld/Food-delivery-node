import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes';
import globalHandleError from './utils/handleErrors';
import authRouter from './routes/authRoutes';
import bannerRouter from './routes/bandRoutes';
import cityRouter from './routes/cityRoutes';
import categoryRouter from './routes/categoryRoutes';
import resturantRouter from './routes/resturantRoutes';
import cors from 'cors';
import config from './config';
console.log(config);
export class Server {
  public app: express.Application = express();
  constructor() {
    this.setConfigs();
    this.setRoutes();
    this.error404Handler();
    this.errorHandler();
  }
  setConfigs() {
    this.configureExpressJson();
    this.connectMongoDB();
    this.allowCors();
  }

  connectMongoDB() {
    mongoose
      .connect(config.DB_URI)
      .then(() => {
        console.log('Connect Mongo DB successfully');
      })
      .catch((err) => console.log(err));
  }

  configureExpressJson() {
    this.app.use(express.json());
  }
  allowCors() {
    this.app.use(cors());
  }
  setRoutes() {
    this.app.use('/api/v1/auth', authRouter);
    this.app.use('/api/v1/users', userRouter);
    this.app.use('/api/v1/banner', bannerRouter);
    this.app.use('/api/v1/city', cityRouter);
    this.app.use('/api/v1/category', categoryRouter);
    this.app.use('/api/v1/resturant', resturantRouter);
  }
  error404Handler() {
    this.app.use((request: Request, response: Response) => {
      response.status(404).json({
        status: 404,
        message: 'Not Found',
      });
    });
  }
  errorHandler() {
    this.app.use(globalHandleError);
  }
}
