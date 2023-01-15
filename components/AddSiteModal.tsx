import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';

import { useRef } from 'react';
import { useForm } from 'react-hook-form';

import { createSite } from '@/lib/firestore';
import { useAuth } from '@/lib/auth';

const AddSiteModal = () => {
  const auth = useAuth();
  const userUID = auth?.user.uid;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onCreateSite = (data: NewSite): Promise<void> =>
    createSite(data, userUID);

  return (
    <>
      <Button size='md' maxW='200px' onClick={onOpen}>
        Add Your First Site
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent as='form' onSubmit={handleSubmit(onCreateSite)}>
          <ModalHeader fontWeight='bold'>Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder='My site'
                {...register('site', { required: true, maxLength: 40 })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input
                placeholder='https://minhtungo.com'
                {...register('url', {
                  required: true,
                  pattern: {
                    value:
                      /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
                    message: 'Invalid URL',
                  },
                })}
              />
              {errors.url && <p>Invalid URL</p>}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3} fontWeight='medium'>
              Cancel
            </Button>{' '}
            <Button colorScheme='blue' mr={3} fontWeight='medium' type='submit'>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSiteModal;
