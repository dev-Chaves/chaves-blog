import express from 'express';
import postRoutes from './routes/PostRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());

app.use('/api/posts', postRoutes);

app.use(errorHandler);

export default app;