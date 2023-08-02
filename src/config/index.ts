import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const {
  NODE_ENV,
  PORT,
  DB_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USERNAME,
  EMAIL_PASSWORD,
} = process.env;

export default {
  NODE_ENV,
  PORT,
  DB_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USERNAME,
  EMAIL_PASSWORD,
};
