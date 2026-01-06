import Link from 'next/link';

export type MovieCardData = {
  id: number;
  slug: string;
  title: string;
  year: number;
  rating?: number; // 0-10
  posterUrl?: string | null;
  genres?: string[];
};

function RatingPill({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-2.5 py-1 text-xs font-semibold text-slate-900">
      {rating.toFixed(1)}
    </span>
  );
}

export default function MovieCard({ movie }: { movie: MovieCardData }) {
  return (
    <Link
      href={`/movies/${movie.slug}`}
      className="group overflow-hidden rounded-2xl border border-black/10 bg-white transition hover:bg-slate-50"
    >
      <div className="relative aspect-[16/10] w-full bg-slate-100">
        {/* Replace with next/image later */}
        <div className="flex h-full items-center justify-center text-xs text-slate-500">Poster</div>

        {typeof movie.rating === 'number' && (
          <div className="absolute left-3 top-3">
            <RatingPill rating={movie.rating} />
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-slate-900 group-hover:underline">
              {movie.title}
            </div>
            <div className="mt-1 text-xs text-slate-500">{movie.year}</div>
          </div>

          <span className="rounded-lg border border-black/10 px-2 py-1 text-xs text-slate-700">
            →
          </span>
        </div>

        {movie.genres?.length ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {movie.genres.slice(0, 3).map(g => (
              <span
                key={g}
                className="rounded-full bg-slate-900/5 px-2.5 py-1 text-[11px] text-slate-700"
              >
                {g}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  );
}
