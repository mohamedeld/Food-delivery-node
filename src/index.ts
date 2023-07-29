import { getEnvironmentVariable } from "./environment/environment";
import { Server } from "./server";


const server = new Server().app;

const PORT = process.env.PORT || 8000;

server.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
});