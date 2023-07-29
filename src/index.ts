import { Server } from "./server";
import dotenv from 'dotenv';

const server = new Server().app;
dotenv.config({path:'./config.env'});

const PORT = process.env.PORT || 8000;
server.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
});