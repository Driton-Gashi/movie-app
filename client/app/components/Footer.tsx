'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

type FooterLinkItem = {
  label: string;
  href: string;
  external?: boolean;
};

const footerSections: Array<{ title: string; links: FooterLinkItem[] }> = [
  {
    title: 'Explore',
    links: [
      { label: 'Movies', href: '/movies' },
      { label: 'Series', href: '/series' },
      { label: 'Collections', href: '/collections' },
      { label: 'Top Rated', href: '/movies?sort=rating' },
      { label: 'New Releases', href: '/movies?sort=latest' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Sign In', href: '/login' },
      { label: 'Register', href: '/register' },
      { label: 'Watchlist', href: '/me/watchlist' },
      { label: 'Favorites', href: '/me/favorites' },
      { label: 'Profile', href: '/me' },
    ],
  },
  {
    title: 'Support & Legal',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Cookie Settings', href: '/cookies' },
    ],
  },
];

const socialLinks: FooterLinkItem[] = [
  { label: 'GitHub', href: 'https://github.com', external: true },
  { label: 'X / Twitter', href: 'https://x.com', external: true },
  { label: 'Instagram', href: 'https://instagram.com', external: true },
  { label: 'YouTube', href: 'https://youtube.com', external: true },
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30 dark:text-slate-400 dark:hover:text-white dark:focus-visible:ring-slate-200/40"
    >
      {children}
    </Link>
  );
}

function FooterExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:-translate-y-0.5 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30 motion-safe:transition-transform dark:text-slate-400 dark:hover:text-white dark:focus-visible:ring-slate-200/40"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitted'>('idle');
  const currentYear = new Date().getFullYear();

  const isEmailValid = useMemo(() => emailRegex.test(email.trim()), [email]);
  const showError = isTouched && email.length > 0 && !isEmailValid;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsTouched(true);

    if (!isEmailValid) return;
    setStatus('submitted');
  };

  return (
    <footer
      className="relative mt-16 overflow-hidden border-t border-black/10 bg-white/80 text-slate-900 backdrop-blur dark:border-white/10 dark:bg-slate-950/70 dark:text-white"
      aria-label="Footer"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(148,163,184,0.25),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-linear-to-r from-transparent via-slate-300/60 to-transparent dark:via-slate-400/40" />

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div>
              <div className="text-lg font-semibold tracking-tight">MovieApp</div>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Curated stories, bold visuals, and cinematic vibes in every scroll.
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-500/90 dark:text-sky-300">
                Now Trending
              </p>
            </div>
          </div>

          {footerSections.map(section => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map(link => (
                  <li key={link.label}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>

              {section.title === 'Support & Legal' && (
                <div className="mt-6 rounded-2xl border border-black/10 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Newsletter
                  </div>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    Weekly premieres, hidden gems, and watchlist drops.
                  </p>
                  <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
                    <label className="sr-only" htmlFor="footer-email">
                      Email address
                    </label>
                    <input
                      id="footer-email"
                      type="email"
                      value={email}
                      onChange={event => {
                        setEmail(event.target.value);
                        setStatus('idle');
                      }}
                      onBlur={() => setIsTouched(true)}
                      placeholder="you@movieapp.com"
                      className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 dark:border-white/10 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 dark:focus:ring-slate-200/50"
                      aria-invalid={showError}
                      aria-describedby={showError ? 'footer-email-error' : undefined}
                    />
                    {showError && (
                      <p
                        id="footer-email-error"
                        className="text-xs text-rose-600 dark:text-rose-400"
                      >
                        Please enter a valid email address.
                      </p>
                    )}
                    {status === 'submitted' && (
                      <p className="text-xs text-emerald-600 dark:text-sky-300">
                        You are on the list. Expect something cinematic.
                      </p>
                    )}
                    <button
                      type="submit"
                      className="w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30 motion-safe:transition-transform dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 dark:focus-visible:ring-white/60"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-black/10 pt-6 dark:border-white/10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
              Follow
            </div>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map(link => (
                <FooterExternalLink key={link.label} href={link.href}>
                  <span className="sr-only">{link.label}</span>
                  <SocialIcon label={link.label} />
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {link.label}
                  </span>
                </FooterExternalLink>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-black/10 pt-6 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>© {currentYear} MovieApp.</div>
            <div className="text-slate-500 dark:text-slate-400">
              Made with late-night screenings and fresh popcorn.
            </div>
            <label className="inline-flex items-center gap-2">
              <span className="sr-only">Language</span>
              <select
                aria-label="Language"
                className="rounded-lg border border-black/10 bg-white px-2 py-1 text-xs text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-900/30 dark:border-white/10 dark:bg-slate-950 dark:text-slate-300 dark:focus:ring-slate-200/40"
                defaultValue="English"
              >
                <option>English</option>
                <option>Albanian</option>
                <option>German</option>
                <option>Italian</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ label }: { label: string }) {
  const baseClass = 'h-4 w-4 text-current';

  switch (label) {
    case 'GitHub':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={baseClass}>
          <path
            fill="currentColor"
            d="M12 2a10 10 0 00-3.16 19.48c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.2-3.37-1.2-.46-1.17-1.13-1.48-1.13-1.48-.92-.64.07-.63.07-.63 1.02.07 1.56 1.05 1.56 1.05.9 1.55 2.36 1.1 2.94.84.09-.66.35-1.1.63-1.35-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.02a9.6 9.6 0 015 0c1.9-1.29 2.75-1.02 2.75-1.02.55 1.4.2 2.44.1 2.7.64.7 1.03 1.6 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.32.68.93.68 1.88v2.79c0 .26.18.57.69.48A10 10 0 0012 2z"
          />
        </svg>
      );
    case 'X / Twitter':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={baseClass}>
          <path
            fill="currentColor"
            d="M18.9 2h2.9l-6.3 7.2L23 22h-6.5l-4.9-6.4L5.9 22H3l6.8-7.8L1 2h6.7l4.4 5.8L18.9 2zm-1 17h1.6L7.7 4.6H6l11.9 14.4z"
          />
        </svg>
      );
    case 'Instagram':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={baseClass}>
          <path
            fill="currentColor"
            d="M16.98 2H7.02A5.02 5.02 0 002 7.02v9.96A5.02 5.02 0 007.02 22h9.96A5.02 5.02 0 0022 16.98V7.02A5.02 5.02 0 0016.98 2zm3.02 14.98A3 3 0 0117 20H7a3 3 0 01-3-3.02V7.02A3 3 0 017 4h10a3 3 0 013 3.02v9.96z"
          />
          <path
            fill="currentColor"
            d="M12 7a5 5 0 100 10 5 5 0 000-10zm0 8.2A3.2 3.2 0 1112 8.8a3.2 3.2 0 010 6.4z"
          />
          <circle cx="17.5" cy="6.5" r="1.3" fill="currentColor" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={baseClass}>
          <path
            fill="currentColor"
            d="M21.6 7.2a2.8 2.8 0 00-2-2C18 4.8 12 4.8 12 4.8s-6 0-7.6.4a2.8 2.8 0 00-2 2A29 29 0 002 12a29 29 0 00.4 4.8 2.8 2.8 0 002 2c1.6.4 7.6.4 7.6.4s6 0 7.6-.4a2.8 2.8 0 002-2A29 29 0 0022 12a29 29 0 00-.4-4.8zM10 15.2V8.8l5.4 3.2L10 15.2z"
          />
        </svg>
      );
  }
}
