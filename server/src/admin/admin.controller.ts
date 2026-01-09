import type { Response } from 'express';
import type { AuthRequest } from '../auth/auth.middleware';
import { adminService } from './admin.service';

export class AdminController {
  async getDashboard(_req: AuthRequest, res: Response): Promise<void> {
    const stats = await adminService.getDashboardStats();
    res.status(200).json({ ok: true, data: stats });
  }

  async getUsers(req: AuthRequest, res: Response): Promise<void> {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 50;

    const result = await adminService.getAllUsers(page, limit);
    res.status(200).json({ ok: true, data: result });
  }

  async getViewStats(_req: AuthRequest, res: Response): Promise<void> {
    const stats = await adminService.getViewStats();
    res.status(200).json({ ok: true, data: stats });
  }

  async getUserStats(_req: AuthRequest, res: Response): Promise<void> {
    const stats = await adminService.getUserStats();
    res.status(200).json({ ok: true, data: stats });
  }
}

export const adminController = new AdminController();
