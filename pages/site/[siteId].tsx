// @ts-nocheck

import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Feedback from '@/components/feedback/Feedback';
import { getAllFeedback, getAllSites } from '@/lib/firestore-admin';
import { useAuth } from '@/lib/auth';
import { createFeedback } from '@/lib/firestore';

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
    fallback: false, // can also be true or 'blocking'
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

  return (
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
          <Input
            type='comment'
            id='comment'
            placeholder='Leave a comment'
            value={input}
            bg='white'
            onChange={(e) => setInput(e.target.value)}
          />
          <Button mt={2} type='submit' fontWeight='semibold' colorScheme='gray'>
            Add Comment
          </Button>
        </FormControl>
      </Box>
      {allFeedback.map((feedback) => (
        <Feedback key={feedback.id} {...feedback} />
      ))}
    </Box>
  );
};

export default SiteFeedback;
