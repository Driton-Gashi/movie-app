// Client-side analytics tracking utility
// This can be called from client components or server components

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
const API_PATH = API_URL.includes('/api') ? '' : '/api';

export type PageType =
  | 'home'
  | 'movie'
  | 'series'
  | 'episode'
  | 'movies_list'
  | 'series_list'
  | 'watchlist'
  | 'favorites'
  | 'me'
  | 'other';

export async function trackPageView(data: {
  page_type: PageType;
  page_slug?: string;
  wp_post_id?: number;
  user_id?: number;
}): Promise<void> {
  try {
    // Fire and forget - don't block the page load
    fetch(`${API_URL}${API_PATH}/analytics/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    }).catch(() => {
      // Silently fail - analytics shouldn't break the app
    });
  } catch {
    // Silently fail
  }
}
