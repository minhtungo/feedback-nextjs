import { Box, Heading, Text, Divider, Flex, Icon } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { FiGithub } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

interface FeedbackProps {
  author?: string;
  text: string;
  createdAt?: string;
  provider?: string;
  siteSettings?: {
    displayIcon: boolean;
    showRating: boolean;
    showTimestamp: boolean;
  };
}

const Feedback = ({
  author,
  text,
  createdAt,
  provider,
  siteSettings,
}: FeedbackProps) => {
  return (
    <Box borderRadius='sm' maxW='700px' w='full'>
      <Flex align='center'>
        <Heading
          size='sm'
          as='h3'
          mb={0}
          color='gray.900'
          fontWeight='semibold'
        >
          {author}
        </Heading>
        {siteSettings?.displayIcon && (
          <Icon
            as={provider?.includes('google') ? FcGoogle : FiGithub}
            ml={2}
          />
        )}
      </Flex>
      {siteSettings?.showTimestamp && (
        <Text color='gray.500' mb={4} fontSize='xs'>
          {dayjs(createdAt).format('MMM D, YYYY, h:mm A')}
        </Text>
      )}

      <Text color='gray.800'>{text}</Text>
      <Divider borderColor='gray.200' my={6} />
    </Box>
  );
};

export default Feedback;
