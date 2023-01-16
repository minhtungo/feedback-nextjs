// @ts-nocheck
import { Box, Code, Switch, IconButton } from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import RemoveButton from '../common/RemoveButton';

import { Table, Tr, Th, Td } from '../common/Table';

const FeedbackTable = ({ allFeedback }: any) => {
  return (
    <Box overflowX='scroll'>
      <Table w='full'>
        <thead>
          <Tr>
            <Th>Name</Th>
            <Th>Feedback</Th>
            <Th>Route</Th>
            <Th>Visible</Th>
            <Th>{''}</Th>
          </Tr>
        </thead>
        <tbody>
          {allFeedback.map((feedback) => (
            <Box as='tr' key={feedback.id}>
              <Td fontWeight='semibold'>{feedback.author}</Td>
              <Td>{feedback.text}</Td>
              <Td>
                <Code>{'/'}</Code>
              </Td>
              <Td>
                <Switch defaultChecked={feedback.status === 'active'} />
              </Td>
              <Td display='flex' align='center'>
                <RemoveButton feedbackId={feedback.id}/>
              </Td>
            </Box>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default FeedbackTable;
