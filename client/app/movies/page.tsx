import PageContainer from '@/components/PageContainer';
import MovieCard, { type MovieCardData } from '@/components/MovieCard';

const GENRES = ['All', 'Action', 'Drama', 'Comedy', 'Sci-Fi', 'Thriller'] as const;
const SORTS = ['Trending', 'Newest', 'Top Rated', 'A–Z'] as const;

type SearchParams = {
  q?: string;
  genre?: string;
  sort?: string;
};

const MOCK_MOVIES: MovieCardData[] = [
  {
    id: 1,
    slug: 'the-last-horizon',
    title: 'The Last Horizon',
    year: 2024,
    rating: 8.4,
    genres: ['Sci-Fi', 'Action'],
  },
  {
    id: 2,
    slug: 'midnight-protocol',
    title: 'Midnight Protocol',
    year: 2022,
    rating: 7.9,
    genres: ['Thriller'],
  },
  { id: 3, slug: 'northbound', title: 'Northbound', year: 2021, rating: 7.6, genres: ['Drama'] },
  {
    id: 4,
    slug: 'laughing-season',
    title: 'Laughing Season',
    year: 2023,
    rating: 7.2,
    genres: ['Comedy'],
  },
  {
    id: 5,
    slug: 'steel-runner',
    title: 'Steel Runner',
    year: 2020,
    rating: 7.8,
    genres: ['Action'],
  },
  {
    id: 6,
    slug: 'echoes-of-june',
    title: 'Echoes of June',
    year: 2019,
    rating: 7.4,
    genres: ['Drama', 'Thriller'],
  },
];

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function sortMovies(items: MovieCardData[], sort: string) {
  switch (sort) {
    case 'Newest':
      return [...items].sort((a, b) => b.year - a.year);
    case 'Top Rated':
      return [...items].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    case 'A–Z':
      return [...items].sort((a, b) => a.title.localeCompare(b.title));
    case 'Trending':
    default:
      return items; // keep mock order for now
  }
}

function buildQueryLink(params: URLSearchParams, key: string, value: string) {
  const next = new URLSearchParams(params.toString());
  if (value === 'All' && key === 'genre') next.delete(key);
  else next.set(key, value);
  return `?${next.toString()}`;
}

export default function MoviesPage({ searchParams }: { searchParams?: SearchParams }) {
  const q = searchParams?.q ?? '';
  const genre = searchParams?.genre ?? 'All';
  const sort = searchParams?.sort ?? 'Trending';

  // NOTE: Replace MOCK_MOVIES with real API later (server fetch)
  const params = new URLSearchParams();
  if (q) params.set('q', q);
  if (genre && genre !== 'All') params.set('genre', genre);
  if (sort && sort !== 'Trending') params.set('sort', sort);

  const filtered = MOCK_MOVIES.filter(m => {
    const matchesQuery =
      !q ||
      normalize(m.title).includes(normalize(q)) ||
      (m.genres?.some(g => normalize(g).includes(normalize(q))) ?? false);

    const matchesGenre = genre === 'All' || (m.genres?.includes(genre) ?? false);

    return matchesQuery && matchesGenre;
  });

  const finalList = sortMovies(filtered, sort);

  return (
    <PageContainer
      title="Movies"
      description={q ? `Results for “${q}”` : 'Browse movies and refine using filters.'}
      rightSlot={
        <div className="text-xs text-slate-500">
          {finalList.length} result{finalList.length === 1 ? '' : 's'}
        </div>
      }
    >
      {/* Filters */}
      <div className="rounded-2xl border border-black/10 bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Genre */}
            <div className="space-y-1">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Genre
              </div>
              <div className="flex flex-wrap gap-2">
                {GENRES.map(g => (
                  <a
                    key={g}
                    href={buildQueryLink(params, 'genre', g)}
                    className={[
                      'rounded-full px-3 py-1.5 text-sm font-medium transition',
                      genre === g || (g === 'All' && genre === 'All')
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-900/5 text-slate-800 hover:bg-slate-900/10',
                    ].join(' ')}
                  >
                    {g}
                  </a>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="space-y-1">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Sort
              </div>
              <div className="flex flex-wrap gap-2">
                {SORTS.map(s => (
                  <a
                    key={s}
                    href={buildQueryLink(params, 'sort', s)}
                    className={[
                      'rounded-full px-3 py-1.5 text-sm font-medium transition',
                      sort === s
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-900/5 text-slate-800 hover:bg-slate-900/10',
                    ].join(' ')}
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Clear filters (keeps q optional) */}
          <div className="flex justify-start lg:justify-end">
            <a
              href={q ? `?q=${encodeURIComponent(q)}` : '?'}
              className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50"
            >
              Reset filters
            </a>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {finalList.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Empty state */}
      {finalList.length === 0 && (
        <div className="mt-8 rounded-2xl border border-black/10 bg-white p-8 text-center">
          <div className="text-sm font-semibold text-slate-900">No results found</div>
          <div className="mt-2 text-sm text-slate-600">
            Try a different search term or reset filters.
          </div>
          <div className="mt-5">
            <a
              href="?"
              className="inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
            >
              Reset
            </a>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
