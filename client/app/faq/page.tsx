import Link from 'next/link';
import PageContainer from '@/components/PageContainer';

const faqs = [
  {
    question: 'Where does the catalog data come from?',
    answer:
      'Movies, series, episodes, and genres are pulled from the WordPress catalog API used across Tratics.',
  },
  {
    question: 'How do watchlists and favorites work?',
    answer:
      'When you add a title, it is stored in your account list API so it stays with you across devices.',
  },
  {
    question: 'Why do some titles not have ratings?',
    answer:
      'Ratings and metadata depend on what is available in the WordPress catalog. Some titles may be missing fields.',
  },
  {
    question: 'Can I search by genre?',
    answer:
      'Yes. Use Search and tap a genre to filter movies, series, and episodes by category.',
  },
  {
    question: 'Do I need an account to browse?',
    answer:
      'No. You can browse the catalog without an account. An account is needed to save watchlists and favorites.',
  },
  {
    question: 'How do I update my profile details?',
    answer:
      'Profile details are managed through the account API. If you need changes, contact support for now.',
  },
];

export default function FaqPage() {
  return (
    <PageContainer title="FAQ" description="Answers to common questions about Tratics.">
      <div className="space-y-4">
        {faqs.map(faq => (
          <section
            key={faq.question}
            className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-slate-800"
          >
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              {faq.question}
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{faq.answer}</p>
          </section>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-slate-800">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Still need help?
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Reach out to the team with any additional questions or issues.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600"
          >
            Contact support
          </Link>
          <Link
            href="/settings"
            className="inline-flex items-center rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            Go to settings
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
