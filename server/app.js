import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// routers
import userRouter from './routes/userRoutes.js';
import internshipRouter from './routes/internshipRoutes.js';
import inviteRouter from './routes/inviteRoutes.js';

// creates an express app
const app = express();

// runs express app on the PORT variable or 3000
app.listen(process.env.PORT || 3001, () => {
  console.log(`server running on port: ${process.env.PORT || 3001}`);
});

// - - - - - - - - - - - - - - - - - - - - - - - - -

// MIDDLEWARE

// parses the posted JSON data into a JavaScript object -> the request.body object
app.use(express.json());
// allows cross-origin resource sharing
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
// parses any cookie data sent to to the server
app.use(cookieParser());
// - - - - - - - - - - - - - - - - - - - - - - - - -

// DATABASE CONNECTION

// connects to database using mongoose
mongoose
  .connect(process.env.DBURI)
  .then(() => {
    console.log('connected to database');
  })
  .catch((err) => {
    console.log(`The error when connecting to the database is: ${err}`);
  });

// user routes
app.use(userRouter);

// internship routes
app.use(internshipRouter);

// invite routes
app.use(inviteRouter);
