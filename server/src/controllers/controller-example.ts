import type { Request, Response, NextFunction } from 'express';
import { CustomError } from '../middleware/errorHandler';
import {
  getCimerByEmailModel,
  getAllCimersModel,
  getCimerByIdModel,
} from '../models/model-example';
import { logger } from '../utils/logger';

export const getCimerByEmailController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const emailParam = req.query.email;

    const email = typeof emailParam === 'string' ? emailParam.trim() : '';

    if (!email) {
      res.status(400).json({
        success: false,
        message: 'Email query parameter is required.',
        example: '/cimerat/by-email?email=example@gmail.com',
      });
      return;
    }

    const cimer = await getCimerByEmailModel(email);

    if (!cimer) {
      res.status(404).json({ success: false, message: 'Cimer not found.' });
      return;
    }

    res.status(200).json({ success: true, data: cimer });
  } catch (error) {
    logger.error('Error in getCimerByEmailController:', error);
    next(new CustomError('Failed to fetch cimer by email', 500));
  }
};

export const getAllCimersController = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const cimers = await getAllCimersModel();
    res.status(200).json({ success: true, data: cimers });
  } catch (error) {
    logger.error('Error in getAllCimersController:', error);
    next(new CustomError('Failed to fetch cimers', 500));
  }
};

export const getCimerByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ success: false, message: 'Invalid cimer ID.' });
      return;
    }

    const cimer = await getCimerByIdModel(id);

    if (!cimer) {
      res.status(404).json({ success: false, message: 'Cimer not found.' });
      return;
    }

    res.status(200).json({ success: true, data: cimer });
  } catch (error) {
    logger.error('Error in getCimerByIdController:', error);
    next(new CustomError('Failed to fetch cimer by ID', 500));
  }
};
