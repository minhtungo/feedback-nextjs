// @ts-nocheck
import { Box, Code, Switch } from '@chakra-ui/react';
import { useState } from 'react';

import { updateFeedback } from '@/lib/firestore';
import RemoveButton from '../common/RemoveButton';
import useSWR from 'swr';

import { Td } from '../common/Table';
import { useAuth } from '@/lib/auth';

const FeedbackRow = ({ id, author, text, route, status }: any) => {
  const [checked, setChecked] = useState(status === 'active');
  const { user } = useAuth();

  const { mutate } = useSWR(['/api/feedback', user?.token]);

  const onToggleFeedback = async (e) => {
    setChecked(!checked);
    await updateFeedback(id, { status: !checked ? 'active' : 'disabled' });
    mutate();
  };
  return (
    <Box as='tr'>
      <Td fontWeight='semibold'>{author}</Td>
      <Td>{text}</Td>
      <Td>
        <Code>{route || '/'}</Code>
      </Td>
      <Td>
        <Switch isChecked={checked} onChange={onToggleFeedback} />
      </Td>
      <Td display='flex' align='center'>
        <RemoveButton feedbackId={id} />
      </Td>
    </Box>
  );
};

export default FeedbackRow;
