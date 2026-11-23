import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { ENV } from './config/env.config.js';
import apiRouter from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';

const app = express();

// Security and utility middleware
app.use(helmet());
app.use(
  cors({
    origin: ENV.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Mount API routes
app.use('/api/v1', apiRouter);

// Root fallback
app.get('/', (_req, res) => {
  res.json({
    name: 'Solve Sense API',
    description: 'AI-Powered Competitive Exam Problem-Solving Platform',
    version: '1.0.0',
    documentation: '/api/v1/health',
  });
});

// Centralized error handler
app.use(errorHandler);

const PORT = parseInt(ENV.PORT, 10) || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Solve Sense Backend API running on port ${PORT} [${ENV.NODE_ENV}]`);
});

export default app;
