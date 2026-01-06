import PageContainer from '@/components/PageContainer';

export default function MovieDetailsPage({ params }: { params: { slug: string } }) {
  return (
    <PageContainer title="Movie Details" description={`Slug: ${params.slug}`}>
      <div className="rounded-2xl border border-black/10 bg-white p-6">
        <p className="text-sm text-slate-600">
          Replace this with real movie details (fetch from your backend by slug).
        </p>
      </div>
    </PageContainer>
  );
}
