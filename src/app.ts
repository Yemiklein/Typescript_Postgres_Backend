import createError from 'http-errors';
import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import db from './config/database.config';
import cors from 'cors';
import 'dotenv/config';


import userRouter from './routes/user';
import groupRouter from './routes/group';
import roleRouter from './routes/role';



 //db.sync({force:true})
db.sync({alter:true})
  .then(() => {
    console.log('Database conneted successfully 🎉🚀');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));




app.use('/users', userRouter);

app.use('/groups', groupRouter);

app.use('/roles', roleRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

export default app;
