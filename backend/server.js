/* eslint-disable spaced-comment */
/* eslint-disable import/order */
/* eslint-disable no-empty */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable arrow-spacing */
/* eslint-disable quotes */
/* eslint-disable no-console */
// const express = require("express");// comman js which is ES5 vs using require
 // nodejs which is ES6 version using import
// const cors = require("cors");
// const data = require("./data.js");
// eslint-disable-next-line spaced-comment

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import config from './config';
import userRouter from './routers/userRouter';
import orderRouter from './routers/orderRouter';
import productRouter from './routers/productRouter';
import uploadRouter from './routers/uploadRouter';

const app = express(); // app is an object of express class
app.use(cors());

app.use(bodyParser.json());

app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/products',productRouter);
app.use('/api/orders', orderRouter);
app.get('/api/paypal/clientID', (req, res) =>{
    res.send({
        clientId: config.PAYPAL_CLIENT_ID
    });
});

app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use(express.static(path.join(__dirname, '/../frontend')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../frontend/index.html'));
});

app.use((err, req, res, next) =>{
    const status = err.name && err.name === "ValidationError"? 400: 500;
    res.status(status).send({message: err.message});
});

mongoose.connect(config.MONGODB_URL, {  
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() =>{
    app.listen(config.PORT, ()=>{
        console.log("Server is running on http://localhost:5000");
        console.log("MongoDB Connected");
    });
}).catch((error) => {
    console.log(error.reason);
})


// mongodb+srv://chandra:chandra@pc.sozl11k.mongodb.net/?retryWrites=true&w=majority