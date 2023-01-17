import { Box, Flex, Text, Badge } from '@chakra-ui/react';

interface AccountTableProps {
  children: React.ReactNode;
}
const AccountTable = ({ children }: AccountTableProps) => (
  <Box
    bg='white'
    mt={8}
    borderRadius={[0, 8]}
    boxShadow='0px 4px 10px rgba(0, 0, 0, 0.05)'
  >
    <Flex
      bg='gray.50'
      borderTopLeftRadius={[0, 8, 8]}
      borderTopRightRadius={[0, 8, 8]}
      borderBottom='1px solid gray.200'
      px={6}
      py={4}
    >
      <Flex justify='space-between' align='center' w='full'>
        <Text
          textTransform='uppercase'
          fontSize='xs'
          fontWeight='semibold'
          color='gray.500'
        >
          My Account
        </Text>
        <Badge h='1rem' colorScheme='blue'>
          Trial
        </Badge>
      </Flex>
    </Flex>
    <Flex direction='column' p={6}>
      {children}
    </Flex>
  </Box>
);

export default AccountTable;
