import Head from 'next/head';
import { FiGithub } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { Flex, Button, Icon, Stack } from '@chakra-ui/react';
import Link from 'next/link';
import { MdOutlineFeedback } from 'react-icons/md';

import { useAuth } from '@/lib/auth';
import StyledButton from '@/components/common/StyledButton';
import LoginButtons from '@/components/common/LoginButtons';

// export async function getStaticProps() {
//   const { feedback } = await getAllFeedback('1234567890');

//   return {
//     props: {
//       allFeedback: feedback || [],
//     },
//     revalidate: 60,
//   };
// }

export default function Home() {
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
      <Flex
        as='main'
        direction='column'
        align='center'
        justify='center'
        h='100vh'
      >
        <Icon as={MdOutlineFeedback} boxSize={10} />
        {auth.user ? (
          <>
            <Link href='/sites'>
              <StyledButton size='sm'>View Dashboard</StyledButton>
            </Link>
            <Button size='sm' onClick={() => auth.signOutUser()}>
              Sign Out
            </Button>
          </>
        ) : (
          <LoginButtons mt={4}/>
        )}
      </Flex>
    </>
  );
}
