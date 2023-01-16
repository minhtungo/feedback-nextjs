// @ts-nocheck

import Link from 'next/link';
import { Box, Link as ChakraLink } from '@chakra-ui/react';
import dayjs from 'dayjs';

import { Table, Tr, Th, Td } from './Table';

const SiteTable = ({ sites }: any) => {
  return (
    <Box overflowX='scroll'>
      <Table w='full'>
        <thead>
          <Tr>
            <Th>Name</Th>
            <Th>Site Link</Th>
            <Th>Feedback Link</Th>
            <Th>Date Added</Th>
            <Th width='75px'>{''}</Th>
          </Tr>
        </thead>
        <tbody>
          {sites.map((site) => (
            <Box as='tr' key={site.id}>
              <Td fontWeight='semibold'>{site.name}</Td>
              <Td>{site.url}</Td>
              <Td>
                <Link href={`/site/${site.id}`}>
                  <ChakraLink as='span'>View Feedback</ChakraLink>
                </Link>
              </Td>
              <Td>{dayjs(site.createdAt).format('MMM D, YYYY, h:mm A')}</Td>
            </Box>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default SiteTable;
