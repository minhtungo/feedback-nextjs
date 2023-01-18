// @ts-nocheck

import {
  Flex,
  Link as ChakraLink,
  Icon,
  Avatar,
} from '@chakra-ui/react';
import { MdOutlineFeedback } from 'react-icons/md';
import Link from 'next/link';

import { useAuth } from '@/lib/auth';

const Navbar = () => {
  const { user, signOutUser } = useAuth();

  return (
    <Flex bg='white' mb={[8, 16]} w='full'>
      <Flex
        align='center'
        justify='space-between'
        maxW='1250px'
        py={4}
        px={8}
        margin='0 auto'
        w='full'
        h='60px'
      >
        <Flex align='center'>
          <Link href='/'>
            <Icon as={MdOutlineFeedback} boxSize={6} mr={8} />
          </Link>
          <Link href='/sites'>
            <ChakraLink as='span' mr={4}>
              Sites
            </ChakraLink>
          </Link>
          <Link href='/feedback'>
            <ChakraLink as='span'>Feedback</ChakraLink>
          </Link>
        </Flex>
        <Flex justify='center' align='center'>
          {user && (
            <Link href='/account'>
              <ChakraLink as='span' mr={4}>
                Account
              </ChakraLink>
            </Link>
          )}
          <Avatar size='sm' src={user?.photoURL} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Navbar;
