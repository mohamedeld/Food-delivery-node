import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes';
import globalHandleError from './utils/handleErrors';
import authRouter from './routes/authRoutes';
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
