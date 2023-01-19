import { deleteSite } from '@/lib/firestore';
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

const DeleteSiteButton = ({ siteId }: { siteId: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLDivElement>(null);

  const { user } = useAuth();

  const { mutate } = useSWR(['/api/sites', user?.token], ([url, token]) =>
    fetcher(url, token)
  );

  const onDeleteFeedback = async () => {
    await deleteSite(siteId);
    mutate();
    onClose();
  };

  return (
    <>
      <IconButton
        icon={<MdDelete size='18px' />}
        aria-label='Delete site'
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
              Delete Site
            </AlertDialogHeader>

            <AlertDialogBody>
              {`Are you sure? This will delete all feedbacks on the site. You can't undo this action afterwards.`}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme='red'
                onClick={onDeleteFeedback}
                ml={3}
                fontWeight='semibold'
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteSiteButton;
