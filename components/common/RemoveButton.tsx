import { deleteFeedback } from '@/lib/firestore';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { MdDelete } from 'react-icons/md';
import useSWR from 'swr';

import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';

const RemoveButton = ({ feedbackId }: { feedbackId: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const { user } = useAuth();

  const { mutate } = useSWR(['/api/feedback', user?.token], ([url, token]) =>
    fetcher(url, token)
  );

  const onDeleteFeedback = async () => {
    await deleteFeedback(feedbackId);
    mutate();
    onClose();
  };

  return (
    <>
      <IconButton
        icon={<MdDelete size='18px' />}
        aria-label='Delete feedback'
        variant='ghost'
        onClick={onOpen}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Feedback
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={onDeleteFeedback} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default RemoveButton;
