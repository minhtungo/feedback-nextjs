// @ts-nocheck

import { Flex, Box } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import Navbar from '../common/Navbar';

interface DashboardShellTypes {
  children: React.ReactNode;
}

const DashboardShell = ({ children }: DashboardShellTypes) => {
  const router = useRouter();
  const path = router.asPath;
  const name =
    path.split('/')[1].charAt(0).toUpperCase() + path.split('/')[1].slice(1);

  const url = `https://feedback-next-theta.vercel.app${router.asPath}`;

  return (
    <>
      <NextSeo
        title={name}
        canonical={url}
        openGraph={{
          url,
          name,
        }}
      />
      <Box h='100vh' bg='gray.100'>
        <Navbar />
        <Flex
          maxW='1250px'
          w='full'
          direction='column'
          margin='0 auto'
          px={[0, 8, 8]}
        >
          {children}
        </Flex>
      </Box>
    </>
  );
};

export default DashboardShell;
