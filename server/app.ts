import 'module-alias/register';
import express from 'express';
import passport from 'passport';
import { Server } from 'socket.io';
import { createServer } from 'http';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '@/config/database';
import strategy from '@/config/passport';
import { User } from '@/models';
import authRouter from '@/routes/authRouter';
import setupSessionSocket from '@/sockets/sessionSocket';
import sessionRouter from '@/routes/sessionRouter';

dotenv.config();
const PORT = process.env.PORT || 3000;

const getDocumentsFromDB = async () => {
  const result = await User.find({}).exec();
  /* eslint-disable no-console */
  console.log('Database Content : ');
  console.log(result);
  /* eslint-disable no-console */
};

connectDB();
getDocumentsFromDB();

const app = express();
const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT,
  },
});

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

passport.use(strategy); // Configure passport to use JWT Strategy

app.use('/', authRouter);
app.use('/', sessionRouter);

setupSessionSocket();

server.listen(PORT, () => console.log(`Server running at port ${PORT}`));

export default app;
