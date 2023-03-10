import { Box, Heading, Text, Divider, Flex, Icon } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { FiGithub } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import ReactMarkdown from 'react-markdown';

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
  isLast?: boolean;
}

const Feedback = ({
  author,
  text,
  createdAt,
  provider,
  siteSettings,
  isLast,
}: FeedbackProps) => {
  return (
    <>
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

        <Box>
          <ReactMarkdown>{text}</ReactMarkdown>
        </Box>
        <Divider borderColor='gray.200' my={4} />
      </Box>
      {/* {!isLast && (
        <Divider borderColor={'gray.50'} mt={6} mb={6} />
      )} */}
    </>
  );
};

export default Feedback;
