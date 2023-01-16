// @ts-nocheck

import { Flex, Box } from '@chakra-ui/react';
import Navbar from '../common/Navbar';

interface DashboardShellTypes {
  children: React.ReactNode;
}

const DashboardShell = ({ children }: DashboardShellTypes) => {
  return (
    <Box bg='gray.50' h='100vh'>
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
  );
};

export default DashboardShell;
