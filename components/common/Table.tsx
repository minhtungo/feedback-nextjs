import { Box, Text } from '@chakra-ui/react';

export const Th = (props: any) => (
  <Text
    as='th'
    textTransform='uppercase'
    fontSize='xs'
    color='gray.500'
    fontWeight='medium'
    px={4}
    {...props}
  />
);

export const Td = (props: any) => (
  <Box
    as='td'
    color='gray.900'
    p={4}
    borderBottom='1px solid'
    borderBottomColor='gray.100'
    {...props}
  />
);

export const Tr = (props: any) => (
  <Box
    as='tr'
    bg='gray.50'
    borderTopLeftRadius={8}
    borderTopRightRadius={8}
    borderBottom='1px solid'
    borderBottomColor='gray.200'
    height='40px'
    {...props}
  />
);

export const Table = (props: any) => {
  return (
    <Box
      as='table'
      textAlign='left'
      bg='white'
      ml={0}
      mr={0}
      borderRadius={8}
      boxShadow='0px 4px 10px rgba(0, 0, 0, 0.05)'
      {...props}
    />
  );
};
