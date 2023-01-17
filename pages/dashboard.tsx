import useSWR from 'swr';

import EmptyState from '@/components/dashboard/EmptyState';
import SiteTableSkeleton from '@/components/site/SiteTableSkeleton';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import SiteTable from '@/components/site/SiteTable';
import TableHeader from '@/components/common/TableHeader';

export default function Dashboard() {
  const { user } = useAuth();

  const { data, isLoading, error } = useSWR(
    user ? ['/api/sites', user?.token] : null,
    ([url, token]) => fetcher(url, token)
  );

  if (error) {
    return (
      <DashboardShell>
        <TableHeader link='sites' title='sites' addModal />
        <EmptyState />
      </DashboardShell>
    );
  }

  if (!data) {
    return (
      <DashboardShell>
        <TableHeader link='sites' title='sites' addModal />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <TableHeader link='sites' title='sites' addModal />
      {data.sites && data.sites.length > 0 ? (
        <SiteTable sites={data.sites} />
      ) : (
        <EmptyState />
      )}
    </DashboardShell>
  );
}
