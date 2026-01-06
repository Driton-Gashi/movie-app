import type { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      // Add custom properties to Request here if needed in the future
      // Example: userId?: string;
    }
  }
}

export {};
