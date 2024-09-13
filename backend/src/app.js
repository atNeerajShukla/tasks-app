import express, { json, urlencoded } from 'express';
import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cors from "cors"

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))

app.use(json({ limit: "16kb" }))
app.use(urlencoded({ extended: true, limit: "16kb" }))

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);


export { app };

