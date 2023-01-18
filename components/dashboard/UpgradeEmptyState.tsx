import { Heading, Flex, Text, Button } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';

const UpgradeEmptyState = () => {
  const { user } = useAuth();

  const onSignUpPlan = () => {};

  return (
    <Flex
      width='100%'
      backgroundColor='white'
      borderRadius='8px'
      p={16}
      justify='center'
      align='center'
      direction='column'
    >
      <Heading size='lg' mb={2}>
        Get feedback on your site instantly.
      </Heading>
      <Text mb={4}>Let&apos;s get started!</Text>
      <Button
        onClick={() => onSignUpPlan()}
        backgroundColor='gray.900'
        color='white'
        fontWeight='semibold'
        _hover={{
          bg: 'gray.700',
        }}
        _active={{
          bg: 'gray.800',
          transform: 'scale(1.05)',
        }}
      >
        Sign Up for Free Trial
      </Button>
    </Flex>
  );
};

export default UpgradeEmptyState;
