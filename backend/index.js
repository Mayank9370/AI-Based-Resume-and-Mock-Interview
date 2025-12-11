import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import userRouter from './routes/userRoutes.js';
import connectDb from './config/db.js';
import resumeRouter from './routes/resumeRoutes.js';
import aiRouter from './routes/aiRoutes.js';

const app = express();
const PORT = process.env.PORT;

app.use(cors({
  origin: process.env.VITE_URL,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/linkedin', userRouter);
app.use('/api/resumes', resumeRouter);
app.use('/api/ai', aiRouter);

// Start server and connect to database
const startServer = async () => {
  try {
    // Connect to database first
    await connectDb();

    // Then start the server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌐 CORS enabled for: ${process.env.VITE_URL}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();