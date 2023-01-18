// @ts-nocheck

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
  useToast,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import useSWR from 'swr';

import { useAuth } from '@/lib/auth';
import { FieldValues, useForm } from 'react-hook-form';

import { createSite } from '@/lib/firestore';
import fetcher from '@/utils/fetcher';
import StyledButton from '../common/StyledButton';

const AddSiteModal = ({ text }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth();

  const { data, mutate } = useSWR(['/api/sites', user?.token], ([url, token]) =>
    fetcher(url, token)
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onCreateSite = async ({ name, url }: FieldValues): void => {
    setIsLoading(true)
    const newSite = {
      authorId: user ? user.uid : null,
      createdAt: new Date().toISOString(),
      name,
      url,
    };
    const { id: newSiteId } = await createSite(newSite);

    toast({
      title: 'Success!',
      description: "We've added your site.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    mutate({ sites: [{ id: newSiteId, ...newSite }, ...data.sites] });
    setIsLoading(false)
    onClose();
  };

  return (
    <>
      <StyledButton onClick={onOpen}>{text}</StyledButton>
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
                {...register('name', { required: true, maxLength: 40 })}
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
            <Button colorScheme='blue' mr={3} fontWeight='medium' type='submit' isLoading={isLoading}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSiteModal;
