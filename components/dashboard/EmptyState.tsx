import { Heading, Flex, Text } from '@chakra-ui/react';
import AddSiteModal from './AddSiteModal';

const EmptyState = () => (
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
      You haven&apos;t added any sites.
    </Heading>
    <Text mb={4}>Let&apos;s get started!</Text>
    <AddSiteModal text={'Add Your First Site'} />
  </Flex>
);

export default EmptyState;
