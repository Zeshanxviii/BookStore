import express from "express";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5173
const DBURL = process.env.MongoDBURL

//middle ware parse body
app.use(express.json())

//midlle ware Cors pollicy
//method 1 for all request
// app.use(cors({
//   origin: 'https://book-store-frontend-g6fvzyqlv-jishans-projects-80682501.vercel.app'
// }));
app.use(cors())
//method 2 for speacific url

//   app.use(cors({
//   origin: 'https://book-store-practise.vercel.app'
// }));


app.use('/books',booksRoute)
// app.get("/", (req, res) => {
//   res.send("<h1>Hello world</h1>");
// });


mongoose.connect(DBURL)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () =>{
        console.log(`Sever is runing on Port:${PORT} ....`)
    })
  })
  .catch((err) => {
    if (err.name === 'MongooseServerSelectionError') {
      console.error('Could not connect to MongoDB:', err.reason);
    } else {
      console.error('MongoDB connection error:', err);
    }
  });
