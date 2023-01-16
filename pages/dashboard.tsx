import useSWR from 'swr';

import EmptyState from '@/components/dashboard/EmptyState';
import SiteTableSkeleton from '@/components/table/SiteTableSkeleton';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import SiteTable from '@/components/table/SiteTable';

export default function Dashboard() {
  const { user } = useAuth();

  const { data, isLoading, error } = useSWR(
    user ? ['/api/sites', user?.token] : null,
    ([url, token]) => fetcher(url, token)
  );

  if (error) {
    return (
      <DashboardShell>
        <EmptyState />
      </DashboardShell>
    );
  }

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      {data.sites ? <SiteTable sites={data.sites} /> : <EmptyState />}
    </DashboardShell>
  );
}
