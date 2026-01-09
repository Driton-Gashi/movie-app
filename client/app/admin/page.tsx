import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Link from 'next/link';
import PageContainer from '@/components/PageContainer';
import { adminApi } from '@/src/lib/admin-api';
import { meApi } from '@/src/lib/api';

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(cookie => `${cookie.name}=${cookie.value}`)
    .join('; ');

  // Check if user is authenticated and is admin
  try {
    await meApi.getProfile(cookieHeader);
  } catch (error) {
    redirect('/login');
  }

  // Check role - if not admin, redirect
  // Note: We need to check role from the auth endpoint, not me endpoint
  // For now, we'll check via the admin API which will return 403 if not admin
  let stats;
  try {
    stats = await adminApi.getDashboard(cookieHeader);
  } catch (error) {
    redirect('/');
  }

  return (
    <PageContainer title="Admin Dashboard" description="Platform statistics and management">
      <div className="space-y-8">
        {/* Overview Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Users"
            value={stats.users.total_users}
            subtitle={`${stats.users.users_today} today`}
          />
          <StatCard
            title="Total Views"
            value={stats.views.total_views}
            subtitle={`${stats.views.views_today} today`}
          />
          <StatCard
            title="Watchlist Items"
            value={stats.lists.total_watchlist_items}
            subtitle={`${stats.lists.favorites_by_type.length} types`}
          />
          <StatCard
            title="Favorites"
            value={stats.lists.total_favorite_items}
            subtitle={`${stats.lists.favorites_by_type.length} types`}
          />
        </div>

        {/* User Statistics */}
        <div className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            User Statistics
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400">This Week</div>
              <div className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
                {stats.users.users_this_week}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400">This Month</div>
              <div className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
                {stats.users.users_this_month}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400">With Lists</div>
              <div className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
                {stats.users.users_with_lists}
              </div>
            </div>
          </div>
        </div>

        {/* View Statistics */}
        <div className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            View Statistics
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400">This Week</div>
              <div className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
                {stats.views.views_this_week}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400">This Month</div>
              <div className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
                {stats.views.views_this_month}
              </div>
            </div>
          </div>

          {stats.views.views_by_type.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Views by Page Type
              </h3>
              <div className="mt-3 space-y-2">
                {stats.views.views_by_type.map(item => (
                  <div
                    key={item.page_type}
                    className="flex items-center justify-between rounded-lg border border-black/10 bg-white p-3 dark:border-white/10 dark:bg-slate-700/50"
                  >
                    <span className="text-sm text-slate-700 dark:text-slate-300">
                      {item.page_type.replace('_', ' ')}
                    </span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Top Content */}
        <div className="grid gap-6 lg:grid-cols-2">
          {stats.views.top_movies.length > 0 && (
            <div className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-slate-800">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Top Movies
              </h2>
              <div className="mt-4 space-y-2">
                {stats.views.top_movies.map((movie, idx) => (
                  <div
                    key={movie.wp_post_id}
                    className="flex items-center justify-between rounded-lg border border-black/10 bg-white p-3 dark:border-white/10 dark:bg-slate-700/50"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                        #{idx + 1}
                      </span>
                      <span className="text-sm text-slate-700 dark:text-slate-300">
                        {movie.page_slug || `Movie ${movie.wp_post_id}`}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {movie.view_count} views
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {stats.views.top_series.length > 0 && (
            <div className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-slate-800">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Top Series
              </h2>
              <div className="mt-4 space-y-2">
                {stats.views.top_series.map((series, idx) => (
                  <div
                    key={series.wp_post_id}
                    className="flex items-center justify-between rounded-lg border border-black/10 bg-white p-3 dark:border-white/10 dark:bg-slate-700/50"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                        #{idx + 1}
                      </span>
                      <span className="text-sm text-slate-700 dark:text-slate-300">
                        {series.page_slug || `Series ${series.wp_post_id}`}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {series.view_count} views
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Recent Users */}
        {stats.recent_users.length > 0 && (
          <div className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-slate-800">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Recent Users
              </h2>
              <Link
                href="/admin/users"
                className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
              >
                View all →
              </Link>
            </div>
            <div className="mt-4 space-y-2">
              {stats.recent_users.map(user => (
                <div
                  key={user.id}
                  className="flex items-center justify-between rounded-lg border border-black/10 bg-white p-3 dark:border-white/10 dark:bg-slate-700/50"
                >
                  <div>
                    <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {user.email}
                    </div>
                    {user.username && (
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        @{user.username}
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {new Date(user.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
}

function StatCard({ title, value, subtitle }: { title: string; value: number; subtitle?: string }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-slate-800">
      <div className="text-xs font-medium text-slate-500 dark:text-slate-400">{title}</div>
      <div className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">{value}</div>
      {subtitle && (
        <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{subtitle}</div>
      )}
    </div>
  );
}
