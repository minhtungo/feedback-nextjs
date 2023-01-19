import { Flex, Link } from '@chakra-ui/react';

const FeedbackLink = ({ siteId }: { siteId: string }) => {
  return (
    <Flex justify='space-between' mb={8} w='full' mt={1}>
      <Link target="_blank" fontWeight='bold' fontSize='sm' href={`/site/${siteId}`}>
        Leave a comment →
      </Link>
      <Link fontSize='xs' color='grey.100' href='/'>
        Feedback
      </Link>
    </Flex>
  );
};

export default FeedbackLink;
