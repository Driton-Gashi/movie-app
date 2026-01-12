import Link from 'next/link';
import PageContainer from '@/components/PageContainer';

const contactCards = [
  {
    title: 'Support',
    description: 'Questions about your account, watchlist, or favorites.',
    action: {
      label: 'Email support',
      href: 'mailto:support@tratics.app',
    },
  },
  {
    title: 'Catalog feedback',
    description: 'Missing title, incorrect metadata, or WordPress sync issue.',
    action: {
      label: 'Report an issue',
      href: 'mailto:catalog@tratics.app',
    },
  },
  {
    title: 'Partnerships',
    description: 'Press, partnerships, or collaboration inquiries.',
    action: {
      label: 'Contact partnerships',
      href: 'mailto:partners@tratics.app',
    },
  },
];

export default function ContactPage() {
  return (
    <PageContainer title="Contact" description="We respond within 1-2 business days.">
      <div className="grid gap-6 lg:grid-cols-3">
        {contactCards.map(card => (
          <section
            key={card.title}
            className="flex h-full flex-col justify-between rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-slate-800"
          >
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {card.title}
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                {card.description}
              </p>
            </div>
            <a
              href={card.action.href}
              className="mt-4 inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600"
            >
              {card.action.label}
            </a>
          </section>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Before you reach out
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li>Check the FAQ for common answers about catalog data and lists.</li>
            <li>Include the title slug or URL if you are reporting a catalog issue.</li>
            <li>For account updates, include the email address tied to your profile.</li>
          </ul>
          <Link
            href="/faq"
            className="mt-4 inline-flex items-center text-sm font-semibold text-slate-900 hover:text-slate-700 dark:text-slate-100 dark:hover:text-slate-300"
          >
            Visit the FAQ
          </Link>
        </section>

        <section className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Location and hours
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Movie App is a remote team focused on building a fast movie and series catalog experience.
          </p>
          <div className="mt-4 rounded-xl border border-black/5 bg-slate-50 p-4 text-sm text-slate-600 dark:border-white/5 dark:bg-slate-900/40 dark:text-slate-400">
            Support hours: Monday to Friday, 9:00 AM to 6:00 PM CET.
          </div>
        </section>
      </div>
    </PageContainer>
  );
}
