import express from 'express';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
const app = express();
dotenv.config({path: './config/config.env'});
import userRouter from './routes/UserRoute.js';

app.use('/api/user', userRouter)

app.listen(3000, () => {
    connectDB();
    console.log("Service is runn ing on port 3000");
});