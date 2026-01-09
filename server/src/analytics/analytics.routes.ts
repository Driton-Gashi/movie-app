import { Router } from 'express';
import { analyticsController } from './analytics.controller';

const router = Router();

// Public endpoint for tracking (no auth required)
router.post('/track', analyticsController.trackView.bind(analyticsController));

export default router;
