import { adminService } from '../admin/admin.service';

export class AnalyticsService {
  async trackPageView(data: {
    user_id?: number | null;
    page_type: string;
    page_slug?: string | null;
    wp_post_id?: number | null;
    user_agent?: string | null;
    ip_address?: string | null;
    referer?: string | null;
  }): Promise<void> {
    // Use the admin service's trackPageView method
    await adminService.trackPageView({
      user_id: data.user_id || undefined,
      page_type: data.page_type,
      page_slug: data.page_slug || undefined,
      wp_post_id: data.wp_post_id || undefined,
      user_agent: data.user_agent || undefined,
      ip_address: data.ip_address || undefined,
      referer: data.referer || undefined,
    });
  }
}

export const analyticsService = new AnalyticsService();
