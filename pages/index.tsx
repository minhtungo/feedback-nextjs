import Head from 'next/head';
import { FiGithub } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { Flex, Button, Icon, Stack } from '@chakra-ui/react';
import Link from 'next/link';
import { MdOutlineFeedback } from 'react-icons/md';

import { useAuth } from '@/lib/auth';
import { getAllFeedback } from '@/lib/firestore-admin';

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
              <Button
                size='sm'
                fontWeight='semibold'
                my={4}
                bg='white'
                color='gray.900'
                variant='outline'
                _hover={{
                  bg: 'gray.50',
                }}
                _active={{
                  bg: 'gray.50',
                  transform: 'scale(1.05)',
                }}
              >
                View Dashboard
              </Button>
            </Link>
            <Button size='sm' onClick={() => auth.signOutUser()}>
              Sign Out
            </Button>
          </>
        ) : (
          <Stack spacing='12px'>
            <Button
              size='md'
              fontWeight='semibold'
              onClick={() => auth.signInWithGitHub()}
              leftIcon={<FiGithub />}
              mt={4}
              bg='gray.900'
              color='white'
              _hover={{
                bg: 'gray.700',
              }}
              _active={{
                bg: 'gray.800',
                transform: 'scale(1.05)',
              }}
            >
              Sign In with GitHub
            </Button>
            <Button
              size='md'
              fontWeight='semibold'
              onClick={() => auth.signInWithGoogle()}
              leftIcon={<FcGoogle />}
              mt={4}
              bg='white'
              color='gray.900'
              variant='outline'
              _hover={{
                bg: 'gray.100',
              }}
              _active={{
                bg: 'gray.100',
                transform: 'scale(1.05)',
              }}
            >
              Sign In with Google
            </Button>
          </Stack>
        )}
      </Flex>
    </>
  );
}
