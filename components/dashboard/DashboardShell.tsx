// @ts-nocheck

import {
  Flex,
  Breadcrumb,
  Heading,
  Box,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import Navbar from '../common/Navbar';
import AddSiteModal from './AddSiteModal';

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
        <Breadcrumb />
        <Breadcrumb>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink color='gray.700' fontSize='sm'>
              Sites
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex justify='space-between' align='center'>
          <Heading mb={4}>My Sites</Heading>
          <AddSiteModal text={'+ Add Site'} />
        </Flex>
        {children}
      </Flex>
    </Box>
  );
};

export default DashboardShell;
