import type { Response, NextFunction } from 'express';
import type { AuthRequest } from '../auth/auth.middleware';
import { CustomError } from '../middleware/errorHandler';

export const requireAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // First check if user is authenticated (requireAuth should run before this)
    if (!req.user) {
      throw new CustomError('Unauthorized', 401);
    }

    // Check if user is admin
    if (req.user.role !== 'admin') {
      throw new CustomError('Forbidden: Admin access required', 403);
    }

    next();
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({
        ok: false,
        message: error.message,
      });
    } else {
      res.status(403).json({
        ok: false,
        message: 'Forbidden: Admin access required',
      });
    }
  }
};
