import Link from 'next/link';
import PageContainer from '@/components/PageContainer';

const privacySections = [
  {
    title: 'Information we collect',
    details: [
      'Account details such as email, username, and join date.',
      'Watchlist and favorites entries tied to your account.',
      'Session cookies used to keep you signed in.',
    ],
  },
  {
    title: 'How we use information',
    details: [
      'Authenticate your account and keep lists synced across devices.',
      'Personalize the catalog experience using your saved lists.',
      'Respond to support requests and troubleshoot issues.',
    ],
  },
  {
    title: 'Catalog data sources',
    details: [
      'Movies, series, episodes, and genres are pulled from the WordPress catalog API.',
      'We display metadata exactly as provided by the catalog source.',
    ],
  },
  {
    title: 'Your choices',
    details: [
      'Log out to clear session access in your browser.',
      'Edit watchlist or favorites directly from title pages.',
      'Contact support to request data changes or account removal.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <PageContainer title="Privacy Policy" description="How Movie App handles your data.">
      <div className="space-y-6">
        {privacySections.map(section => (
          <section
            key={section.title}
            className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-slate-800"
          >
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {section.title}
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              {section.details.map(detail => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section className="mt-8 rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-slate-800">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Questions about privacy?
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          If you would like to review, export, or delete your account data, reach out to the team.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600"
          >
            Contact support
          </Link>
          <Link
            href="/cookies"
            className="inline-flex items-center rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            Review cookies
          </Link>
        </div>
      </section>
    </PageContainer>
  );
}
