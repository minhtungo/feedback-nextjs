import { Heading, Flex, Text, Button } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import StyledButton from '../common/StyledButton';

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
      <StyledButton onClick={() => onSignUpPlan()}>
        Sign Up for Free Trial
      </StyledButton>
    </Flex>
  );
};

export default UpgradeEmptyState;
