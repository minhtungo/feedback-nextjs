// @ts-nocheck

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Feedback from '@/components/feedback/Feedback';
import { getAllFeedback, getAllSites } from '@/lib/firestore-admin';
import { useAuth } from '@/lib/auth';
import { createFeedback } from '@/lib/firestore';
import DashboardShell from '@/components/dashboard/DashboardShell';
import StyledButton from '@/components/common/StyledButton';
import LoginButtons from '@/components/common/LoginButtons';

export async function getStaticProps(context) {
  const siteId = context.params.siteId;
  const { feedback } = await getAllFeedback(siteId);

  return {
    props: {
      initialFeedback: feedback,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { sites } = await getAllSites();

  const paths = sites.map((site) => ({
    params: { siteId: site.id.toString() },
  }));

  return {
    paths,
    fallback: true, // can also be true or 'blocking'
  };
}

const SiteFeedback = ({ initialFeedback }) => {
  const { user } = useAuth();

  const router = useRouter();

  const [input, setInput] = useState('');
  const [allFeedback, setAllFeedback] = useState(initialFeedback);

  const onCommentSubmit = async (e) => {
    e.preventDefault();

    const newFeedback = {
      author: user.name,
      authorId: user.uid,
      siteId: router.query.siteId,
      text: input,
      createdAt: new Date().toISOString(),
      provider: user.provider,
      status: 'pending',
    };

    const { id: newFeedbackId } = await createFeedback(newFeedback);
    setAllFeedback([{ id: newFeedbackId, ...newFeedback }, ...allFeedback]);
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
      <Box
        display='flex'
        flexDirection='column'
        w='full'
        maxW='700px'
        margin='0 auto'
      >
        <Box as='form' onSubmit={onCommentSubmit}>
          <FormControl my={8}>
            <FormLabel htmlFor='comment'>Comment</FormLabel>
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
            <Feedback key={feedback.id} {...feedback} />
          ))
        ) : (
          <Text>There are no comments for this site.</Text>
        )}
      </Box>
    </DashboardShell>
  );
};

export default SiteFeedback;
