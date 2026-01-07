const WP_BASE_URL = process.env.NEXT_PUBLIC_WP_BASE_URL;

if (!WP_BASE_URL) {
  throw new Error('NEXT_PUBLIC_WP_BASE_URL environment variable is required');
}

export type WPTerm = {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
};

export type WPFeaturedMedia = {
  source_url?: string;
  media_details?: {
    sizes?: Record<string, { source_url: string }>;
  };
};

export type WPMovieACF = {
  release_year?: string | number;
  imdb_rating?: number;
  // Add more as you define them in ACF:
  // stream_type?: "none" | "iframe" | "link";
  // stream_url?: string;
  // stream_iframe?: string;
  // trailer_url?: string;
  [key: string]: unknown;
};

export type WPMovie = {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt?: { rendered: string };
  content?: { rendered: string };
  acf?: WPMovieACF;
  featured_media?: number;
  _embedded?: {
    'wp:featuredmedia'?: WPFeaturedMedia[];
    'wp:term'?: WPTerm[][];
  };
};

export type WPMoviesResponse = {
  data: WPMovie[];
  total: number;
  totalPages: number;
};

// type FetchMoviesParams = {
//   q?: string;
//   page?: number;
//   perPage?: number;
// };

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

// function safeTrim(value: string | undefined | null): string {
//   return typeof value === 'string' ? value.trim() : '';
// }

// function toNumber(value: string | null, fallback = 0): number {
//   const n = Number(value);
//   return Number.isFinite(n) ? n : fallback;
// }

export function getExcerptText(movie: WPMovie): string {
  return stripHtml(movie.excerpt?.rendered ?? '');
}

export function getGenres(movie: WPMovie): string[] {
  const termGroups = movie._embedded?.['wp:term'] ?? [];
  const allTerms = termGroups.flat();
  return allTerms.filter(term => term.taxonomy === 'genre').map(term => term.name);
}

export function getReleaseYear(movie: WPMovie): number {
  const year = movie.acf?.release_year;

  if (typeof year === 'number' && Number.isFinite(year)) return year;

  if (typeof year === 'string') {
    const parsed = Number(year);
    if (Number.isFinite(parsed)) return parsed;
  }

  return new Date().getFullYear();
}

export function getRating(movie: WPMovie): number | undefined {
  const rating = movie.acf?.imdb_rating;
  if (typeof rating !== 'number') return undefined;
  if (rating < 0 || rating > 10) return undefined;
  return rating;
}

// function buildMoviesUrl(params?: FetchMoviesParams): URL {
//   const url = new URL(`${WP_BASE_URL}/wp-json/wp/v2/movies`);

//   // Embedded resources: featured images + terms
//   url.searchParams.set('_embed', '1');

//   // Pagination
//   const perPage = params?.perPage ?? 12;
//   const page = params?.page ?? 1;
//   url.searchParams.set('per_page', String(perPage));
//   url.searchParams.set('page', String(page));

//   // Search
//   const q = safeTrim(params?.q);
//   if (q) url.searchParams.set('search', q);

//   // Reduce payload
//   url.searchParams.set('_fields', 'id,slug,title,excerpt,acf,featured_media,_embedded');

//   return url;
// }

export function getFeaturedImageUrl(movie: WPMovie): string | null {
  const media = movie._embedded?.['wp:featuredmedia']?.[0];
  if (!media) return null;

  const sizes = media.media_details?.sizes;

  return (
    sizes?.medium_large?.source_url ??
    sizes?.large?.source_url ??
    sizes?.medium?.source_url ??
    media.source_url ??
    null
  );
}

export async function wpFetchMovies(params?: { q?: string; page?: number; perPage?: number }) {
  const url = new URL(`${WP_BASE_URL}/wp-json/wp/v2/movies`);

  url.searchParams.set('_embed', '1');
  url.searchParams.set('per_page', String(params?.perPage ?? 12));
  url.searchParams.set('page', String(params?.page ?? 1));

  const q = params?.q?.trim();
  if (q) url.searchParams.set('search', q);

  url.searchParams.set('_fields', 'id,slug,title,excerpt,acf,featured_media,_links,_embedded');

  const res = await fetch(url.toString(), {
    next: { revalidate: 60 },
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`WP API error: ${res.status} ${text}`);
  }

  const totalPages = Number(res.headers.get('X-WP-TotalPages') ?? '0');
  const data = (await res.json()) as WPMovie[];

  return { data, totalPages };
}

export type WPMovieDetailsACF = {
  release_year?: string | number;
  runtime_minutes?: number;
  imdb_rating?: number;
  trailer_url?: string;
  stream_type?: 'iframe' | 'link' | 'none' | '';
  stream_url?: string;
  stream_iframe?: string;
  stream_provider?: string;
  [key: string]: unknown;
};

export type WPMovieDetails = Omit<WPMovie, 'acf'> & {
  acf?: WPMovieDetailsACF;
  _embedded?: {
    'wp:featuredmedia'?: WPFeaturedMedia[];
    'wp:term'?: Array<
      Array<{
        id: number;
        name: string;
        slug: string;
        taxonomy: string;
      }>
    >;
  };
};

export async function wpFetchMovieBySlug(
  slug: string | undefined | null
): Promise<WPMovieDetails | null> {
  if (!slug || typeof slug !== 'string') {
    return null;
  }

  const cleanSlug = slug.trim();
  if (!cleanSlug) {
    return null;
  }

  const base = `${WP_BASE_URL}/wp-json/wp/v2/movies`;
  const url = new URL(base);

  url.searchParams.set('slug', cleanSlug);
  url.searchParams.set('_embed', '1');

  const res = await fetch(url.toString(), {
    next: { revalidate: 60 },
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`WP API error: ${res.status} ${text}`);
  }

  const data = (await res.json()) as WPMovieDetails[];

  return data[0] ?? null;
}

export function getRuntime(movie: WPMovieDetails): number | null {
  const v = movie.acf?.runtime_minutes;
  return typeof v === 'number' && Number.isFinite(v) ? v : null;
}

export function getTrailerUrl(movie: WPMovieDetails): string | null {
  const url = typeof movie.acf?.trailer_url === 'string' ? movie.acf.trailer_url.trim() : '';
  return url ? url : null;
}

export function getStreamType(movie: WPMovieDetails): 'iframe' | 'link' | 'none' {
  const t = movie.acf?.stream_type;
  if (t === 'iframe' || t === 'link') return t;
  return 'none';
}

export function getStreamUrl(movie: WPMovieDetails): string | null {
  const url = typeof movie.acf?.stream_url === 'string' ? movie.acf.stream_url.trim() : '';
  return url ? url : null;
}

export function getStreamIframe(movie: WPMovieDetails): string | null {
  const html = typeof movie.acf?.stream_iframe === 'string' ? movie.acf.stream_iframe.trim() : '';
  return html ? html : null;
}

// Minimal allowlist so you don't embed random websites.
const ALLOWED_IFRAME_HOSTS = new Set([
  'www.youtube.com',
  'youtube.com',
  'player.vimeo.com',
  'vimeo.com',
]);

export function sanitizeAndValidateIframe(iframeHtml: string): string | null {
  // Very small sanitizer: we only accept a single iframe tag and extract src.
  const match = iframeHtml.match(/<iframe[^>]*src=["']([^"']+)["'][^>]*><\/iframe>/i);
  const src = match?.[1] ?? null;
  if (!src) return null;

  let host = '';
  try {
    host = new URL(src).host;
  } catch {
    return null;
  }

  if (!ALLOWED_IFRAME_HOSTS.has(host)) return null;

  // Rebuild a safe iframe with controlled attributes.
  // Use 100% width and responsive height through wrapper.
  const safe = `<iframe
    src="${src}"
    title="Video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
    referrerpolicy="strict-origin-when-cross-origin"
  ></iframe>`;

  return safe;
}
