import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import PageContainer from '@/components/PageContainer';
import { adminApi } from '@/src/lib/admin-api';
import { meApi } from '@/src/lib/api';

type UsersPageProps = {
  searchParams?: Promise<{ page?: string }>;
};

export default async function AdminUsersPage({ searchParams }: UsersPageProps) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(cookie => `${cookie.name}=${cookie.value}`)
    .join('; ');

  // Check authentication
  try {
    await meApi.getProfile(cookieHeader);
  } catch (error) {
    redirect('/login');
  }

  const resolvedSearchParams = (await searchParams) ?? {};
  const page = Number(resolvedSearchParams.page) || 1;

  let usersData;
  try {
    usersData = await adminApi.getUsers(page, 50, cookieHeader);
  } catch (error) {
    redirect('/');
  }

  return (
    <PageContainer title="All Users" description="Manage and view all registered users">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Total: {usersData.total} users
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Page {usersData.page} of {usersData.total_pages}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white dark:border-white/10 dark:bg-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-black/10 dark:border-white/10">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Username
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10 dark:divide-white/10">
                {usersData.users.map(user => (
                  <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <td className="px-4 py-3 text-sm text-slate-900 dark:text-slate-100">
                      {user.id}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-900 dark:text-slate-100">
                      {user.email}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">
                      {user.username || '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          user.role === 'admin'
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                            : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {usersData.total_pages > 1 && (
          <div className="flex items-center justify-center gap-2">
            {page > 1 && (
              <a
                href={`/admin/users?page=${page - 1}`}
                className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              >
                Previous
              </a>
            )}
            {page < usersData.total_pages && (
              <a
                href={`/admin/users?page=${page + 1}`}
                className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              >
                Next
              </a>
            )}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
