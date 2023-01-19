import Head from 'next/head';
import { Flex, Button, Icon, Box, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { MdOutlineFeedback } from 'react-icons/md';

import { useAuth } from '@/lib/auth';
import StyledButton from '@/components/common/StyledButton';
import LoginButtons from '@/components/common/LoginButtons';
import { getAllFeedback, getSite } from '@/lib/firestore-admin';
import FeedbackLink from '@/components/feedback/FeedbackLink';
import Feedback from '@/components/feedback/Feedback';

const SITE_ID = '5rDK1ZCfwLiPjNHY9R1q';

export async function getStaticProps() {
  const { feedback } = await getAllFeedback(SITE_ID);
  const { site } = await getSite(SITE_ID);

  return {
    props: {
      allFeedback: feedback || [],
      site,
    },
    revalidate: 10,
  };
}

export default function Home({ allFeedback, site }) {
  const auth = useAuth();

  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          if (document.cookie && document.cookie.includes('authed')) {
            window.location.href = "/sites"
          }
        `,
          }}
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <Box bg='gray.100' py={16} px={4}>
        <Flex as='main' direction='column' maxW='700px' margin='0 auto'>
          <Icon as={MdOutlineFeedback} boxSize={10} />
          <Text mb={4} fontSize='lg' py={4}>
            <Text as='span' fontWeight='bold' display='inline'>
              Feedback Next
            </Text>
            {` helps add comments or reviews to your static site. Try it out by leaving a comment below.`}
          </Text>
          {auth.user ? (
            <>
              <Link href='/sites'>
                <StyledButton size='sm' maxW='200px' mt={4}>
                  View Dashboard
                </StyledButton>
              </Link>
              {/* <Button size='sm' onClick={() => auth.signOutUser()}>
                Sign Out
              </Button> */}
            </>
          ) : (
            <LoginButtons mt={4} />
          )}
        </Flex>
      </Box>
      <Box
        display='flex'
        flexDirection='column'
        w='full'
        maxW='700px'
        margin='0 auto'
        mt={8}
        px={4}
      >
        <FeedbackLink siteId={SITE_ID} />
        {allFeedback && allFeedback.length > 0 ? (
          allFeedback.map((feedback, index) => (
            <Feedback
              key={feedback.id}
              settings={site?.settings}
              isLast={index === allFeedback.length - 1}
              {...feedback}
            />
          ))
        ) : (
          <Text>
            There are no comments yet. Be the first to leave a comment!
          </Text>
        )}
      </Box>
    </>
  );
}
