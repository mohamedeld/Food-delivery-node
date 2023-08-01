import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoutes";
import globalHandleError from "./utils/handleErrors";
import bodyParser from "body-parser";
import authRouter from "./routes/authRoutes";
import config from "./config";
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
    this.configureBodyParser();
    this.connectMongoDB();
  }

  connectMongoDB() {
    mongoose
      .connect(config.DB_URI)
      .then(() => {
        console.log("Connect Mongo DB successfully");
      })
      .catch((err) => console.log(err));
  }
  configureBodyParser() {
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
  configureExpressJson() {
    this.app.use(express.json());
  }
  setRoutes() {
    this.app.use("/api/v1/auth", authRouter);
    this.app.use("/api/v1/users", userRouter);
  }
  error404Handler() {
    this.app.use((request: Request, response: Response, next: NextFunction) => {
      response.status(404).json({
        status: 404,
        message: "Not Found",
      });
    });
  }
  errorHandler() {
    this.app.use(globalHandleError);
  }
}
