import { Box, Heading, Text, Divider } from '@chakra-ui/react';
import dayjs from 'dayjs';

interface FeedbackProps {
  author?: string;
  text: string;
  createdAt?: string;
}

const Feedback = ({ author, text, createdAt }: FeedbackProps) => {
  return (
    <Box borderRadius='sm' maxW='700px' w='full'>
      <Heading size='sm' as='h3' mb={0} color='gray.900' fontWeight='semibold'>
        {author}
      </Heading>
      <Text color='gray.500' mb={4} fontSize='xs'>
        {dayjs(createdAt).format('MMM D, YYYY, h:mm A')}
      </Text>
      <Text color='gray.800'>{text}</Text>
      <Divider borderColor='gray.200' my={6} />
    </Box>
  );
};

export default Feedback;
