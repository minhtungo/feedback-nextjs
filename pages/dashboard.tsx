import useSWR from 'swr';

import EmptyState from '@/components/EmptyState';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import DashboardShell from '@/components/DashboardShell';
import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import SiteTable from '@/components/SiteTable';

export default function Dashboard() {
  const auth = useAuth();
  const { data, error, isLoading } = useSWR('/api/sites', fetcher);

  if (!data || isLoading) {
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
