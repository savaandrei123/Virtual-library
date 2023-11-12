import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import categoryRouter from './routes/categories_route.js';
import postRouter from './routes/posts_route.js';

const app = express();
dotenv.config();

async function connect() {
  try {
    await mongoose.connect(process.env.DB_URI)
    console.log("Connected with MongoDB")
  }
  catch (error) {
    console.error(error)
  }
}
connect()

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/', categoryRouter)
app.use('/posts/', postRouter)

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Serverul rulează pe portul ${PORT}`);
});