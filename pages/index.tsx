import Head from 'next/head';
import { Inter } from '@next/font/google';
import { useAuth } from '@/lib/auth';

import { Flex, Button, Heading, Icon } from '@chakra-ui/react';
import { MdOutlineFeedback } from 'react-icons/md';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const auth = useAuth();

  return (
    <>
      <Head>
        <title>Feedback</title>
      </Head>
      <Flex
        as='main'
        direction='column'
        align='center'
        justify='center'
        h='100vh'
      >
        {/* <Heading>Feedback</Heading> */}
        <Icon as={MdOutlineFeedback} boxSize={8} />
        {/* <Text>
          Current User: <Code>{auth.user ? auth.user.email : 'None'}</Code>
        </Text> */}

        {auth.user ? (
          <>
            <Link href='/dashboard'>
              <Button my={4} size='sm'>Dashboard</Button>
            </Link>
            <Button size='sm' onClick={() => auth.signout()}>
              Sign Out
            </Button>
          </>
        ) : (
          <Button size='sm' mt={4} onClick={() => auth.signInWithGitHub()}>
            Sign In
          </Button>
        )}
      </Flex>
    </>
  );
}
