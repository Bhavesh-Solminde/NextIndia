import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ENV } from './env';
import { errorMiddleware } from './shared/errorMiddleware';
import webhookRoutes from './modules/webhooks/webhooks.routes';
import apiRequestRoutes from './modules/api-requests/api-requests.routes';
import aiDebugRoutes from './modules/ai-debug/ai-debug.routes';
import codeReviewRoutes from './modules/code-review/code-review.routes';

const app: Application = express();

// Middlewares
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (Razorpay webhooks, curl, etc.)
    if (!origin) return callback(null, true);
    return callback(null, true); // Allow all for now
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-razorpay-signature'],
}));
// Raw body for webhook signature verification — must be before express.json()
app.use('/api/webhooks', express.raw({ type: 'application/json' }));

// Your existing line stays below
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Server is healthy',
    data: { uptime: process.uptime() },
  });
});

// Feature module routes
app.use('/api', webhookRoutes);
app.use('/api', apiRequestRoutes);
app.use('/api', aiDebugRoutes);
app.use('/api', codeReviewRoutes);

// Global error handler (must be last)
app.use(errorMiddleware);

export default app;
