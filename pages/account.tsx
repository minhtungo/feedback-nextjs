import { useState } from 'react';
import { Avatar, Heading, Box, Button, Flex, Text } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import DashboardShell from '@/components/dashboard/DashboardShell';
import AccountTable from '@/components/account/AccountTable';
import Usage from '@/components/account/Usage';
import fetcher from '@/utils/fetcher';
import StyledButton from '@/components/common/StyledButton';

const Account = () => {
  const { user, setUser, signOutUser } = useAuth();

  const onSignUpPlan = async () => {
    const response = await fetcher(
      '/api/user/upgrade-plan',
      user?.token,
      'PUT'
    );

    setUser((currentUser: User) =>
      currentUser ? { ...currentUser, plan: response.plan } : null
    );
  };

  return (
    <DashboardShell>
      <Flex
        direction='column'
        maxW='600px'
        align={['left', 'center']}
        margin='0 auto'
      >
        <Flex direction='column' align={['left', 'center']} ml={4}>
          <Avatar
            w={['3rem', '6rem']}
            h={['3rem', '6rem']}
            mb={4}
            src={user?.photoURL}
          />
          <Heading letterSpacing='-1px'>{user?.name}</Heading>
          <Text>{user?.email}</Text>
        </Flex>
        <AccountTable>
          <Usage />
          <Text my={4}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur
            dolorem totam maxime quibusdam eveniet error ad minus, dolore porro
            soluta quam enim beatae repudiandae mollitia, est quisquam facilis
            in odit?
          </Text>
          <Flex justify='flex-end'>
            <StyledButton variant='secondary' onClick={() => signOutUser()}>
              Log Out
            </StyledButton>
            <StyledButton onClick={() => onSignUpPlan()} ml={3}>
              Free Trial
            </StyledButton>
          </Flex>
        </AccountTable>
      </Flex>
    </DashboardShell>
  );
};

export default Account;
