import Link from 'next/link';
import PageContainer from '@/components/PageContainer';

const cookieSections = [
  {
    title: 'Essential cookies',
    description:
      'Used to keep you signed in and to secure requests to the Tratics API. These cookies are required for account features.',
  },
  {
    title: 'Preference cookies',
    description:
      'Remember basic choices like your session state so the UI stays consistent between visits.',
  },
  {
    title: 'Analytics cookies',
    description:
      'Tratics does not use advertising cookies. If analytics are introduced later, we will update this page.',
  },
];

export default function CookiesPage() {
  return (
    <PageContainer title="Cookie Settings" description="Details on how cookies are used on Tratics.">
      <div className="space-y-6">
        {cookieSections.map(section => (
          <section
            key={section.title}
            className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-slate-800"
          >
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {section.title}
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {section.description}
            </p>
          </section>
        ))}
      </div>

      <section className="mt-8 rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-slate-800">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Manage cookies in your browser
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          You can clear cookies or block them in your browser settings. Blocking essential cookies
          may prevent you from staying signed in.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/privacy"
            className="inline-flex items-center rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            Read privacy policy
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600"
          >
            Contact support
          </Link>
        </div>
      </section>
    </PageContainer>
  );
}
