// @ts-nocheck

import { useAuth } from '@/lib/auth';
import {
  Flex,
  Link,
  Stack,
  Icon,
  Avatar,
  Breadcrumb,
  Heading,
  Box,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
} from '@chakra-ui/react';
import { MdOutlineFeedback } from 'react-icons/md';
import AddSiteModal from './AddSiteModal';

interface DashboardShellTypes {
  children: React.ReactNode;
}

const DashboardShell = ({ children }: DashboardShellTypes) => {
  const { user, signout } = useAuth();

  return (
    <Box backgroundColor='gray.50' height='100vh'>
      <Flex
        backgroundColor='white'
        justifyContent='space-between'
        py={4}
        px={8}
      >
        <Flex>
          <Icon as={MdOutlineFeedback} boxSize={6} mr={8} />
          <Link mr={4}>Feedback</Link>
          <Link>Sites</Link>
        </Flex>
        <Flex justify='center' align='center'>
          {user && (
            <Button variant='ghost' mr={2} onClick={() => signout()}>
              Log Out
            </Button>
          )}
          <Avatar size='sm' src={user?.photoURL} />
        </Flex>
      </Flex>
      <Flex p={8} w='100%'>
        <Flex
          maxWidth='1200px'
          w='100%'
          flexDirection='column'
          justifyContent='space-between'
          ml='auto'
          mr='auto'
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
            <AddSiteModal text={'+ Add Site'}/>
          </Flex>
          {children}
        </Flex>
      </Flex>
    </Box>
  );
};

export default DashboardShell;
