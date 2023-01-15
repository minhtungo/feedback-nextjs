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
} from '@chakra-ui/react';
import { MdOutlineFeedback } from 'react-icons/md';

interface DashboardShellTypes {
  children: React.ReactNode;
}

const DashboardShell = ({ children }: DashboardShellTypes) => {
  const auth = useAuth();

  return (
    <Box backgroundColor='gray.50' height='100vh'>
      <Flex
        backgroundColor='white'
        justifyContent='space-between'
        py={4}
        px={8}
      >
        <Stack spacing={4} isInline align='center'>
          <Icon as={MdOutlineFeedback} boxSize={6} />
          <Link>Feedback</Link>
          <Link>Sites</Link>
        </Stack>
        <Flex>
          <Link mr={4}>Account</Link>
          <Avatar size='sm' src={auth.user.photoURL} />
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
              <BreadcrumbLink color='gray.700' fontSize='sm'>Sites</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Heading mb={4}>Sites</Heading>
          {children}
        </Flex>
      </Flex>
    </Box>
  );
};

export default DashboardShell;
