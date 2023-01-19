// @ts-nocheck

import { Box, FormControl, Text, Textarea } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';

import Feedback from '@/components/feedback/Feedback';
import { useAuth } from '@/lib/auth';
import { createFeedback } from '@/lib/firestore';
import DashboardShell from '@/components/dashboard/DashboardShell';
import StyledButton from '@/components/common/StyledButton';
import LoginButtons from '@/components/common/LoginButtons';
import TableHeader from '@/components/common/TableHeader';

const FeedbackPage = () => {
  const { user, loading: isLoading } = useAuth();
  const router = useRouter();

  const query = router.query?.site;
  const siteId = query ? query[0] : null;
  const route = query ? query[1] : null;

  const feedbackApi = route
    ? `/api/feedback/${siteId}/${route}`
    : `/api/feedback/${siteId}`;

  const {data: siteData } = useSWR(
    [`/api/site/${siteId}`, user?.token],
    ([url, token]) => fetcher(url, token)
  );

  const { mutate, data: feedbackData } = useSWR(
    [feedbackApi, user?.token],
    ([url, token]) => fetcher(url, token)
  );

  const site = siteData?.site;
  const allFeedback = feedbackData?.feedback;

  const [input, setInput] = useState('');

  const onCommentSubmit = async (e) => {
    e.preventDefault();

    const newFeedback = {
      siteId,
      siteAuthorId: site?.authorId,
      route: route || '/',
      author: user.name,
      authorId: user.id,
      text: input,
      createdAt: new Date().toISOString(),
      provider: user.provider,
      status: 'pending',
    };
    await createFeedback(newFeedback);
    mutate();
    setInput('');
  };

  const Permission = () =>
    user ? (
      <StyledButton type='submit' isDisabled={!input} mt={4}>
        Add Comment
      </StyledButton>
    ) : (
      <>
        <Text mt={2}>Sign in to leave a comment.</Text>
        <LoginButtons mt={4} />
      </>
    );

  return (
    <DashboardShell>
      <TableHeader
        isSiteOwner={site?.authorId === user?.id}
        title={site?.name}
        subtitle={'Sites'}
        siteName={site?.name}
        route={route}
        settings={site?.settings}
        siteId={siteId}
      />
      <Box display='flex' flexDirection='column' w='full' maxW='700px'>
        <Box as='form' onSubmit={onCommentSubmit}>
          <FormControl my={8}>
            <Textarea
              colorScheme='blackAlpha'
              id='comment'
              placeholder={
                user ? 'Leave a comment' : 'Sign in to leave a comment'
              }
              value={input}
              bg='white'
              h='100px'
              isDisabled={!user}
              onChange={(e) => setInput(e.target.value)}
            />
            {!isLoading && <Permission />}
          </FormControl>
        </Box>
        {allFeedback && allFeedback.length > 0 ? (
          allFeedback.map((feedback, index) => (
            <Feedback
              siteSettings={site?.settings}
              key={feedback.id}
              isLast={index === allFeedback.length - 1}
              {...feedback}
            />
          ))
        ) : (
          <Text>There are no comments for this site.</Text>
        )}
      </Box>
    </DashboardShell>
  );
};

export default FeedbackPage;
