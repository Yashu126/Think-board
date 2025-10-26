import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { connectDB } from './Config/db.js';
import notesRoute from './Routes/notesroute.js';
import rateLimiter from './MiddleWare/rateLimiter.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

app.use(rateLimiter);
app.use(cors(
  {
    origin: 'http://localhost:5173'
  }
))

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
}).catch((error) => {
  console.error('Failed to connect to the database:', error);
});

app.use("/notes", notesRoute);
