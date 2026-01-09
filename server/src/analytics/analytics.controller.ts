import type { Request, Response } from 'express';
import { analyticsService } from './analytics.service';

export class AnalyticsController {
  async trackView(req: Request, res: Response): Promise<void> {
    try {
      const { page_type, page_slug, wp_post_id, user_id } = req.body;

      if (!page_type) {
        res.status(400).json({ ok: false, message: 'page_type is required' });
        return;
      }

      await analyticsService.trackPageView({
        user_id: user_id || null,
        page_type,
        page_slug: page_slug || null,
        wp_post_id: wp_post_id || null,
        user_agent: req.get('user-agent') || null,
        ip_address: req.ip || req.socket.remoteAddress || null,
        referer: req.get('referer') || null,
      });

      res.status(200).json({ ok: true });
    } catch (error) {
      // Silently fail - analytics shouldn't break the app
      res.status(200).json({ ok: true });
    }
  }
}

export const analyticsController = new AnalyticsController();
