import useSWR from 'swr';
import { useRouter } from 'next/router';

import EmptyState from '@/components/dashboard/EmptyState';
import SiteTableSkeleton from '@/components/site/SiteTableSkeleton';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import FeedbackTable from '@/components/feedback/FeedbackTable';
import TableHeader from '@/components/common/TableHeader';

export default function Feedback() {
  const { query } = useRouter();
  const siteId = query.siteId;
  const { user } = useAuth();

  const { data } = useSWR(
    user ? [`/api/feedback/${siteId}`, user?.token] : null,
    ([url, token]) => fetcher(url, token)
  );

  if (!data) {
    return (
      <DashboardShell>
        <TableHeader subtitle='feedback' title='loading...' />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <TableHeader
        subtitle='feedback'
        title={data.site.name}
        siteName={data.site.name}
      />
      {data.feedback ? (
        <FeedbackTable allFeedback={data.feedback} />
      ) : (
        <EmptyState />
      )}
    </DashboardShell>
  );
}
