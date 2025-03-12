import express, { Request, Response } from "express";
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import path from "path";
//import exp from 'constants';


mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
//console.log('MongoDB URI:', process.env.MONGODB_CONNECTION_STRING);
const app=express();
app.use(cookieParser());
app.use(express.json());//convert the body of api request to json
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
}));

app.use(express.static(path.join(__dirname,"../../frontend/dist")));

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);

app.listen(8000, ()=>{
    console.log("server running local host:8000");
});