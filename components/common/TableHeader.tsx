import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
} from '@chakra-ui/react';
import React from 'react';
import AddSiteModal from '../dashboard/AddSiteModal';

interface TableHeaderProps {
  link: string;
  title: string;
  addModal?: boolean;
}

const TableHeader = ({ link, title, addModal = false }: TableHeaderProps) => {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink
            color='gray.700'
            fontSize='sm'
            textTransform='capitalize'
          >
            {link}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex justify='space-between' align='center' textTransform='capitalize'>
        <Heading mb={4}>{title}</Heading>
        {addModal && <AddSiteModal text={'+ Add Site'} />}
      </Flex>
    </>
  );
};

export default TableHeader;
