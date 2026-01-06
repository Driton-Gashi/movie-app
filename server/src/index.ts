import cors from 'cors';
import express from 'express';
import { env } from './config/env';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFound';
import { logger } from './utils/logger';
import cimerRoutes from './routes/route-example';

const app = express();

// CORS configuration
const allowedOrigins =
  env.nodeEnv === 'production'
    ? [process.env.CLIENT_URL || 'http://localhost:3000']
    : ['http://localhost:3000', 'http://localhost:3001'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.get('/', (_req, res) => {
  const baseUrl = `${_req.protocol}://${_req.get('host')}`;

  res.status(200).json({
    success: true,
    message: 'Welcome to the Tratics API',
    version: '1.0.0',
    docs: `${baseUrl}/docs`,
    health: `${baseUrl}/health`,
  });
});

// Example route (replace with actual routes)
app.use('/api/cimerat', cimerRoutes);

// 404 handler
app.use(notFoundHandler);

// Error handler (must be last)
app.use(errorHandler);

const PORT = env.port;

app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
  logger.info(`📝 Environment: ${env.nodeEnv}`);
  logger.info(`🌐 Health check: http://localhost:${PORT}/health`);
});
