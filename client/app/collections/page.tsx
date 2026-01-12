import Link from 'next/link';
import PageContainer from '@/components/PageContainer';

const collections = [
  {
    title: 'Trending movies',
    description: 'Popular films pulled from the WordPress catalog.',
    href: '/movies',
  },
  {
    title: 'Trending series',
    description: 'The latest series gaining momentum right now.',
    href: '/series',
  },
  {
    title: 'Recently added movies',
    description: 'New entries added to the catalog.',
    href: '/movies',
  },
  {
    title: 'Recently added series',
    description: 'Fresh series releases from the feed.',
    href: '/series',
  },
  {
    title: 'Search by genre',
    description: 'Filter movies, series, and episodes by genre tags.',
    href: '/search',
  },
  {
    title: 'Your watchlist',
    description: 'Pick up where you left off with saved titles.',
    href: '/me/watchlist',
  },
];

export default function CollectionsPage() {
  return (
    <PageContainer
      title="Collections"
      description="Curated ways to explore movies, series, and episodes."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {collections.map(collection => (
          <Link
            key={collection.title}
            href={collection.href}
            className="group flex h-full flex-col justify-between rounded-2xl border border-black/10 bg-white p-6 transition hover:-translate-y-1 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                {collection.title}
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                {collection.description}
              </p>
            </div>
            <span className="mt-4 inline-flex items-center text-xs font-semibold text-slate-900 dark:text-slate-100">
              Explore collection -&gt;
            </span>
          </Link>
        ))}
      </div>

      <section className="mt-8 rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-slate-800">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          How collections are built
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Collections highlight titles already available in the WordPress catalog. We group items by
          what is trending, recently added, or saved to your account lists so you can jump straight
          into discovery.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-400">
          <span className="rounded-full border border-black/10 bg-slate-50 px-3 py-1 dark:border-white/10 dark:bg-slate-900/40">
            WordPress catalog
          </span>
          <span className="rounded-full border border-black/10 bg-slate-50 px-3 py-1 dark:border-white/10 dark:bg-slate-900/40">
            Ratings and release year
          </span>
          <span className="rounded-full border border-black/10 bg-slate-50 px-3 py-1 dark:border-white/10 dark:bg-slate-900/40">
            Watchlist and favorites
          </span>
        </div>
      </section>
    </PageContainer>
  );
}
