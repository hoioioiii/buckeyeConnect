import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

// database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('DB connected'))
.catch((err) => console.log('Db not connected', err));

// middleware
app.use(express.json())
app.use(cookieParser()) // used to track user sessions 
app.use(express.urlencoded({extended: false})); // used to parse incoming requests with urlencoded payloads

app.use('/', authRoutes); 


const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`); // Should see this when you do npm start 
}); 
    