import Link from 'next/link';
import PageContainer from '@/components/PageContainer';

const settingsSections = [
  {
    title: 'Account',
    description: 'Your profile details are synced from the Movie App API.',
    items: [
      {
        label: 'Profile overview',
        detail: 'View your email, username, and member date.',
        href: '/me',
        action: 'Open profile',
      },
      {
        label: 'Sign in and security',
        detail: 'Manage access through the login flow for now.',
        href: '/login',
        action: 'Go to login',
      },
    ],
  },
  {
    title: 'Lists',
    description: 'Your watchlist and favorites are stored in your account list API.',
    items: [
      {
        label: 'Watchlist',
        detail: 'Movies and series you plan to watch.',
        href: '/me/watchlist',
        action: 'View list',
      },
      {
        label: 'Favorites',
        detail: 'Titles you have starred as favorites.',
        href: '/me/favorites',
        action: 'View list',
      },
    ],
  },
  {
    title: 'Discovery preferences',
    description: 'Use search and filters to shape your viewing picks.',
    items: [
      {
        label: 'Search the catalog',
        detail: 'Find movies, series, episodes, and genres.',
        href: '/search',
        action: 'Start searching',
      },
      {
        label: 'Browse movies',
        detail: 'Explore the full movie catalog.',
        href: '/movies',
        action: 'Browse movies',
      },
      {
        label: 'Browse series',
        detail: 'Explore the full series catalog.',
        href: '/series',
        action: 'Browse series',
      },
    ],
  },
  {
    title: 'Privacy and legal',
    description: 'Review how we handle account data and cookies.',
    items: [
      {
        label: 'Privacy policy',
        detail: 'Details on data collection and usage.',
        href: '/privacy',
        action: 'Read privacy',
      },
      {
        label: 'Terms of service',
        detail: 'Rules for using Movie App.',
        href: '/terms',
        action: 'Read terms',
      },
      {
        label: 'Cookie settings',
        detail: 'Learn about session cookies and preferences.',
        href: '/cookies',
        action: 'Review cookies',
      },
    ],
  },
];

export default function SettingsPage() {
  return (
    <PageContainer title="Settings" description="Manage your account, lists, and preferences.">
      <div className="grid gap-6 lg:grid-cols-2">
        {settingsSections.map(section => (
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
            <ul className="mt-4 space-y-3">
              {section.items.map(item => (
                <li
                  key={item.label}
                  className="flex flex-col gap-3 rounded-xl border border-black/5 bg-slate-50 p-4 dark:border-white/5 dark:bg-slate-900/40 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {item.label}
                    </div>
                    <div className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                      {item.detail}
                    </div>
                  </div>
                  <Link
                    href={item.href}
                    className="inline-flex items-center justify-center rounded-lg border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-white/10 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                  >
                    {item.action}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-slate-800">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Need help with your account?
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Reach out to the team if you need updates to your profile, data exports, or help
          accessing your lists.
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600"
        >
          Contact support
        </Link>
      </div>
    </PageContainer>
  );
}
