import { useAuth } from '@/lib/auth';

import { Button } from '@chakra-ui/react';
import EmptyState from '@/components/EmptyState';

export default function Dashboard() {
  const auth = useAuth();

  if (!auth.user) {
    return 'Loading...';
  }

  return <EmptyState />;
}
