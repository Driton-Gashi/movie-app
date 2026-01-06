import Link from 'next/link';
import PageContainer from '@/components/PageContainer';

export default function NotFound() {
  return (
    <PageContainer title="Movie not found" description="This movie does not exist.">
      <div className="rounded-2xl border border-black/10 bg-white p-8">
        <div className="text-sm font-semibold text-slate-900">
          We couldn&apos;t find that movie.
        </div>
        <div className="mt-2 text-sm text-slate-600">
          It may have been deleted or the slug is incorrect.
        </div>
        <div className="mt-6">
          <Link
            href="/movies"
            className="inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
          >
            Back to Movies
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
