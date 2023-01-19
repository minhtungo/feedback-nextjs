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
  useToast,
  Switch,
} from '@chakra-ui/react';
import { IoIosSettings } from 'react-icons/io';
import { useRef, useState } from 'react';
import useSWR from 'swr';

import { FieldValues, useForm } from 'react-hook-form';

import { updateSite } from '@/lib/firestore';
import fetcher from '@/utils/fetcher';
import StyledButton from '../common/StyledButton';

const EditSiteModal = ({ text, settings, siteId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data, mutate } = useSWR(['/api/site/${siteId}']);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onEditSite = async (fields: FieldValues): void => {
    setIsLoading(true);
    await updateSite(siteId, {
      settings: fields,
    });

    toast({
      title: 'Success!',
      description: "We've updated your site.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    mutate();
    setIsLoading(false);
    onClose();
  };

  return (
    <>
      <StyledButton onClick={onOpen} leftIcon={<IoIosSettings />}>
        {text}
      </StyledButton>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent as='form' onSubmit={handleSubmit(onEditSite)}>
          <ModalHeader fontWeight='bold'>Edit Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl display='flex' alignItems='center' mb={2}>
              <Switch
                id='displayIcon'
                {...register('displayIcon')}
                defaultChecked={settings?.displayIcon}
              />
              <FormLabel mb='0' ml='2' htmlFor='displayIcon'>
                Show Icon
              </FormLabel>
            </FormControl>
            <FormControl display='flex' alignItems='center' mb={2}>
              <Switch
                id='showTimestamp'
                {...register('showTimestamp')}
                defaultChecked={settings?.showTimestamp}
              />
              <FormLabel mb='0' ml='2' htmlFor='showTimestamp'>
                Show Timestamp
              </FormLabel>
            </FormControl>
            <FormControl display='flex' alignItems='center'>
              <Switch
                id='showRating'
                {...register('showRating')}
                defaultChecked={settings?.showRating}
              />
              <FormLabel mb='0' ml='2' htmlFor='showRating'>
                Show Rating
              </FormLabel>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3} fontWeight='medium'>
              Cancel
            </Button>{' '}
            <Button
              colorScheme='blue'
              mr={3}
              fontWeight='medium'
              type='submit'
              isLoading={isLoading}
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditSiteModal;
