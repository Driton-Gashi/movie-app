import Link from 'next/link';
import PageContainer from '@/components/PageContainer';

const termsSections = [
  {
    title: 'Using Tratics',
    details: [
      'Tratics is a catalog and discovery experience for movies, series, and episodes.',
      'You agree to use the service in a lawful and respectful way.',
    ],
  },
  {
    title: 'Accounts',
    details: [
      'Accounts are required to save watchlists and favorites.',
      'Keep your login details secure and notify us about any unauthorized access.',
    ],
  },
  {
    title: 'Content and metadata',
    details: [
      'Catalog information comes from the WordPress API and is shown as provided.',
      'Tratics does not host streaming content or guarantee availability of titles.',
    ],
  },
  {
    title: 'Availability',
    details: [
      'We work to keep the service reliable, but uptime is not guaranteed.',
      'Features may change as the product evolves.',
    ],
  },
  {
    title: 'Limitation of liability',
    details: [
      'Tratics is provided as-is without warranties of any kind.',
      'We are not liable for indirect damages arising from use of the service.',
    ],
  },
];

export default function TermsPage() {
  return (
    <PageContainer title="Terms of Service" description="The rules for using Tratics.">
      <div className="space-y-6">
        {termsSections.map(section => (
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
          Need clarification?
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Reach out if you have questions about these terms.
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600"
        >
          Contact support
        </Link>
      </section>
    </PageContainer>
  );
}
