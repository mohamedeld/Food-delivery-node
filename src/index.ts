import { Server } from './server';
import config from './config';

const server = new Server().app;

const PORT = config.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
