import 'module-alias/register';
import express from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '@/config/database';
import strategy from '@/config/passport';
import router from '@/routes/router';
import { User } from '@/models/User';

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
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

passport.use(strategy); // Configure passport to use JWT Strategy

app.use('/', router);

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));

export default app;
