// @ts-nocheck

import { Box, FormControl, Text, Textarea } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Feedback from '@/components/feedback/Feedback';
import { getAllFeedback, getAllSites, getSite } from '@/lib/firestore-admin';
import { useAuth } from '@/lib/auth';
import { createFeedback } from '@/lib/firestore';
import DashboardShell from '@/components/dashboard/DashboardShell';
import StyledButton from '@/components/common/StyledButton';
import LoginButtons from '@/components/common/LoginButtons';
import TableHeader from '@/components/common/TableHeader';

export async function getStaticProps(context) {
  const [siteId, route] = context.params.site;
  const { feedback } = await getAllFeedback(siteId, route);
  const { site } = await getSite(siteId);

  return {
    props: {
      initialFeedback: feedback,
      site,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { sites } = await getAllSites();

  const paths = sites.map((site) => ({
    params: { site: [site.id.toString()] },
  }));

  return {
    paths,
    fallback: 'blocking', // can also be true or 'blocking'
  };
}

const SiteFeedback = ({ initialFeedback, site }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const query = router.query?.site;
  const siteId = query ? query[0] : null;
  const route = query ? query[1] : null;

  const [input, setInput] = useState('');
  const [allFeedback, setAllFeedback] = useState(initialFeedback);

  const onCommentSubmit = async (e) => {
    e.preventDefault();

    const newFeedback = {
      siteId,
      route: route || '/',
      author: user.name,
      authorId: user.id,
      text: input,
      createdAt: new Date().toISOString(),
      provider: user.provider,
      status: 'pending',
    };

    setAllFeedback([newFeedback, ...allFeedback]);
    await createFeedback(newFeedback);
    setInput('');
  };

  const Permission = () =>
    user ? (
      <StyledButton
        type='submit'
        isDisabled={!input || router.isFallback}
        mt={4}
      >
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
        isSiteOwner={true}
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
            <Permission />
          </FormControl>
        </Box>
        {allFeedback && allFeedback.length > 0 ? (
          allFeedback.map((feedback) => (
            <Feedback
              siteSettings={site?.settings}
              key={feedback.id}
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

export default SiteFeedback;
