'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PageContainer from '@/components/PageContainer';
import { meApi, type UserProfile } from '@/src/lib/api';
import { useAuth } from '@/src/contexts/AuthProvider';

export default function MePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthLoading) return;
    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }

    let isMounted = true;

    const loadProfile = async () => {
      setIsLoading(true);
      try {
        const data = await meApi.getProfile();
        if (!isMounted) return;
        setProfile(data);
      } catch (error) {
        if (isMounted) {
          router.replace('/login');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, isAuthLoading, router]);

  if (isAuthLoading || isLoading || !profile) {
    return (
      <PageContainer title="My Account" description="Manage your profile and lists">
        <div className="rounded-2xl border border-black/10 bg-white p-6 text-center dark:border-white/10 dark:bg-slate-800">
          <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Loading profile...
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="My Account" description="Manage your profile and lists">
      <div className="space-y-8">
        {/* Profile Section */}
        <div className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Profile</h2>
          <dl className="mt-4 space-y-3">
            <div>
              <dt className="text-xs text-slate-500 dark:text-slate-400">Email</dt>
              <dd className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-100">
                {profile.email}
              </dd>
            </div>
            {profile.username && (
              <div>
                <dt className="text-xs text-slate-500 dark:text-slate-400">Username</dt>
                <dd className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-100">
                  {profile.username}
                </dd>
              </div>
            )}
            <div>
              <dt className="text-xs text-slate-500 dark:text-slate-400">Member since</dt>
              <dd className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-100">
                {new Date(profile.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </dd>
            </div>
          </dl>
        </div>

        {/* Quick Links */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/me/watchlist"
            className="group rounded-2xl border border-black/10 bg-white p-6 transition hover:bg-slate-50 dark:border-white/10 dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Watchlist
                </div>
                <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Movies and series you want to watch
                </div>
              </div>
              <span className="rounded-xl bg-slate-900 px-3 py-1 text-xs font-semibold text-white dark:bg-slate-700">
                View
              </span>
            </div>
            <div className="mt-4 h-1 w-12 rounded-full bg-slate-900/20 transition group-hover:w-20 dark:bg-slate-400/20" />
          </Link>

          <Link
            href="/me/favorites"
            className="group rounded-2xl border border-black/10 bg-white p-6 transition hover:bg-slate-50 dark:border-white/10 dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Favorites
                </div>
                <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Your favorite titles
                </div>
              </div>
              <span className="rounded-xl bg-slate-900 px-3 py-1 text-xs font-semibold text-white dark:bg-slate-700">
                View
              </span>
            </div>
            <div className="mt-4 h-1 w-12 rounded-full bg-slate-900/20 transition group-hover:w-20 dark:bg-slate-400/20" />
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
