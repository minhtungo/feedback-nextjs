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
  siteName?: string;
  addModal?: boolean;
}

const TableHeader = ({
  subtitle,
  title,
  addModal = false,
  siteName,
}: TableHeaderProps) => {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem isCurrentPage={!siteName}>
          <BreadcrumbLink
            color='gray.700'
            fontSize='sm'
            textTransform='capitalize'
          >
            <Link href={`/${subtitle.toLowerCase()}`}>{subtitle}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {siteName && (
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink
              color='gray.700'
              fontSize='sm'
              textTransform='capitalize'
            >
              {siteName}
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
      </Breadcrumb>
      <Flex justify='space-between' align='center' textTransform='capitalize'>
        <Heading mb={4}>{title}</Heading>
        {addModal && <AddSiteModal text={'+ Add Site'} />}
      </Flex>
    </>
  );
};

export default TableHeader;
