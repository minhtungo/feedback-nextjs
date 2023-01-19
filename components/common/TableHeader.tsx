import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import AddSiteModal from '../dashboard/AddSiteModal';

interface TableHeaderProps {
  subtitle?: string;
  title?: string;
  addModal?: boolean;
}

const TableHeader = ({
  subtitle,
  title,
  addModal = false,
}: TableHeaderProps) => {

  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink
            color='gray.700'
            fontSize='sm'
            textTransform='capitalize'
            as='span'
          >
            <Link href={`/${subtitle?.toLowerCase()}`}>{subtitle}</Link>
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
