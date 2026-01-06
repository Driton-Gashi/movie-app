import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageContainer from '@/components/PageContainer';
import {
  wpFetchMovieBySlug,
  getFeaturedImageUrl,
  getGenres,
  getReleaseYear,
  getRating,
  getRuntime,
  getTrailerUrl,
  getStreamType,
  getStreamUrl,
  getStreamIframe,
  sanitizeAndValidateIframe,
} from '@/lib/wp';

export default async function MovieDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  // Handle both Promise and direct params (Next.js 15+ vs older versions)
  const resolvedParams = params instanceof Promise ? await params : params;
  const slug = resolvedParams?.slug;

  if (!slug || typeof slug !== 'string') {
    notFound();
  }

  const movie = await wpFetchMovieBySlug(slug);

  if (!movie) notFound();

  const title = movie.title?.rendered ?? 'Untitled';
  const year = getReleaseYear(movie);
  const rating = getRating(movie);
  const runtime = getRuntime(movie);
  const posterUrl = getFeaturedImageUrl(movie);
  const genres = getGenres(movie);
  const trailerUrl = getTrailerUrl(movie);

  const streamType = getStreamType(movie);
  const streamUrl = getStreamUrl(movie);
  const rawIframe = getStreamIframe(movie);
  const safeIframe = rawIframe ? sanitizeAndValidateIframe(rawIframe) : null;

  return (
    <PageContainer title={title} description={`${year}${runtime ? ` • ${runtime} min` : ''}`}>
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* Left column: Poster + meta */}
        <div className="space-y-4">
          <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
            <div className="aspect-[2/3] bg-slate-100">
              {posterUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={posterUrl}
                  alt={title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-slate-500">
                  No poster
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                  {year}
                </span>

                {typeof rating === 'number' && (
                  <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-slate-900">
                    IMDb {rating.toFixed(1)}
                  </span>
                )}

                {runtime ? (
                  <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                    {runtime} min
                  </span>
                ) : null}
              </div>

              {genres.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {genres.slice(0, 6).map(g => (
                    <span
                      key={g}
                      className="rounded-full bg-slate-900/5 px-2.5 py-1 text-[11px] text-slate-700"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="mt-4 flex flex-col gap-2">
                {trailerUrl ? (
                  <a
                    href={trailerUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
                  >
                    Watch trailer
                  </a>
                ) : null}

                <Link
                  href="/movies"
                  className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 hover:bg-slate-50"
                >
                  Back to Movies
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Player + details */}
        <div className="space-y-6">
          {/* Streaming / Player */}
          <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
            <div className="border-b border-black/10 px-5 py-4">
              <div className="text-sm font-semibold text-slate-900">Watch</div>
              <div className="mt-1 text-xs text-slate-500">
                {streamType === 'iframe'
                  ? 'Embedded player'
                  : streamType === 'link'
                    ? 'External link'
                    : 'Not available'}
              </div>
            </div>

            <div className="p-5">
              {streamType === 'iframe' ? (
                safeIframe ? (
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
                    <div
                      className="absolute inset-0"
                      // eslint-disable-next-line react/no-danger
                      dangerouslySetInnerHTML={{ __html: safeIframe }}
                    />
                    <style
                      // eslint-disable-next-line react/no-danger
                      dangerouslySetInnerHTML={{
                        __html: `
                          .aspect-video iframe {
                            width: 100%;
                            height: 100%;
                          }
                        `,
                      }}
                    />
                  </div>
                ) : (
                  <div className="rounded-xl border border-black/10 bg-slate-50 p-4 text-sm text-slate-700">
                    This embed is missing or not allowed. Add a YouTube/Vimeo iframe in WordPress.
                  </div>
                )
              ) : streamType === 'link' ? (
                streamUrl ? (
                  <a
                    href={streamUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
                  >
                    Watch now
                  </a>
                ) : (
                  <div className="rounded-xl border border-black/10 bg-slate-50 p-4 text-sm text-slate-700">
                    Streaming link is missing. Add <code>stream_url</code> in WordPress.
                  </div>
                )
              ) : (
                <div className="rounded-xl border border-black/10 bg-slate-50 p-4 text-sm text-slate-700">
                  No streaming available for this title.
                </div>
              )}
            </div>
          </div>

          {/* About / Description */}
          <div className="rounded-2xl border border-black/10 bg-white p-6">
            <div className="text-sm font-semibold text-slate-900">About</div>

            <div className="mt-3 text-sm text-slate-700">
              {movie.excerpt?.rendered ? (
                <div
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: movie.excerpt.rendered }}
                />
              ) : (
                <p className="text-slate-600">
                  Add an excerpt/description in WordPress to show details here.
                </p>
              )}
            </div>
          </div>

          {/* Quick facts */}
          <div className="rounded-2xl border border-black/10 bg-white p-6">
            <div className="text-sm font-semibold text-slate-900">Quick facts</div>

            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-black/10 bg-white p-4">
                <dt className="text-xs text-slate-500">Release year</dt>
                <dd className="mt-1 text-sm font-semibold text-slate-900">{year}</dd>
              </div>

              <div className="rounded-xl border border-black/10 bg-white p-4">
                <dt className="text-xs text-slate-500">Runtime</dt>
                <dd className="mt-1 text-sm font-semibold text-slate-900">
                  {runtime ? `${runtime} min` : '—'}
                </dd>
              </div>

              <div className="rounded-xl border border-black/10 bg-white p-4">
                <dt className="text-xs text-slate-500">IMDb rating</dt>
                <dd className="mt-1 text-sm font-semibold text-slate-900">
                  {typeof rating === 'number' ? rating.toFixed(1) : '—'}
                </dd>
              </div>

              <div className="rounded-xl border border-black/10 bg-white p-4">
                <dt className="text-xs text-slate-500">Provider</dt>
                <dd className="mt-1 text-sm font-semibold text-slate-900">
                  {typeof movie.acf?.stream_provider === 'string' &&
                  movie.acf.stream_provider.trim()
                    ? movie.acf.stream_provider
                    : '—'}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
