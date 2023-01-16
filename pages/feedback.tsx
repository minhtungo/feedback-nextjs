import useSWR from 'swr';

import EmptyState from '@/components/dashboard/EmptyState';
import SiteTableSkeleton from '@/components/site/SiteTableSkeleton';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import FeedbackTable from '@/components/feedback/FeedbackTable';
import TableHeader from '@/components/common/TableHeader';

export default function Feedback() {
  const { user } = useAuth();

  const { data, isLoading, error } = useSWR(
    user ? ['/api/feedback', user?.token] : null,
    ([url, token]) => fetcher(url, token)
  );

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <TableHeader link='Feedback' title='My Feedback' />
      {data.feedback ? (
        <FeedbackTable allFeedback={data.feedback} />
      ) : (
        <EmptyState />
      )}
    </DashboardShell>
  );
}
