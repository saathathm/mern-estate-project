import express from 'express';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
dotenv.config({path: './config/config.env'});
import userRouter from './routes/UserRoute.js';
import authRouter from './routes/AuthRoute.js';

const app = express();
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.listen(3000, () => {
    connectDB();
    console.log("Service is running on port 3000");
});