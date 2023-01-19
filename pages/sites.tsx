import useSWR from 'swr';

import EmptyState from '@/components/dashboard/EmptyState';
import SiteTableSkeleton from '@/components/site/SiteTableSkeleton';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import SiteTable from '@/components/site/SiteTable';
import TableHeader from '@/components/common/TableHeader';
import UpgradeEmptyState from '@/components/dashboard/UpgradeEmptyState';
import { tableHeaderConfig } from '@/configs/propConfigs';

export default function Dashboard() {
  const { user } = useAuth();

  const { data, error } = useSWR(
    user ? ['/api/sites', user?.token] : null,
    ([url, token]) => fetcher(url, token)
  );

  if (error) {
    return (
      <DashboardShell>
        <TableHeader {...tableHeaderConfig} />
        <EmptyState />
      </DashboardShell>
    );
  }

  if (!data) {
    return (
      <DashboardShell>
        <TableHeader {...tableHeaderConfig} />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  if (data.sites && data.sites.length > 0) {
    return (
      <DashboardShell>
        <TableHeader {...tableHeaderConfig} />
        <SiteTable sites={data.sites} />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <TableHeader {...tableHeaderConfig} />
      {user?.plan !== 'free' ? <EmptyState /> : <UpgradeEmptyState />}
    </DashboardShell>
  );
}
