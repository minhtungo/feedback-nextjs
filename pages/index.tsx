import Head from 'next/head';
import { Inter } from '@next/font/google';
import { useAuth } from '@/lib/auth';

import { Button, Code, Heading, Text } from '@chakra-ui/react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const auth = useAuth();
  return (
    <>
      <Head>
        <title>Feedback</title>
      </Head>
      <main>
        <Heading>Feedback</Heading>
        <Text>
          Current User: <Code>{auth.user ? auth.user.email : 'None'}</Code>
        </Text>
        <div>
          {auth.user ? (
            <Button onClick={() => auth.signout()}>Sign Out</Button>
          ) : (
            <Button onClick={() => auth.signInWithGitHub()}>Sign In</Button>
          )}
        </div>
      </main>
    </>
  );
}
