import { Heading, Flex, Text } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';

const EmptyFeedback = () => {
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
        {`There isn't any feedback.`}
      </Heading>
      <Text mb={4}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto
        error a, nam voluptatem necessitatibus fugiat quas accusantium libero
        assumenda! Alias a tempora aliquid saepe est, corporis eum dolores cum
        beatae?
      </Text>
    </Flex>
  );
};

export default EmptyFeedback;
