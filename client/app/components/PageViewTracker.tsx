'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView, type PageType } from '@/src/lib/analytics';

type PageViewTrackerProps = {
  pageType: PageType;
  pageSlug?: string;
  wpPostId?: number;
  userId?: number;
};

export default function PageViewTracker({
  pageType,
  pageSlug,
  wpPostId,
  userId,
}: PageViewTrackerProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view when component mounts
    trackPageView({
      page_type: pageType,
      page_slug: pageSlug,
      wp_post_id: wpPostId,
      user_id: userId,
    });
  }, [pathname, pageType, pageSlug, wpPostId, userId]);

  return null;
}
