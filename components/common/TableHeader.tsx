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
import EditSiteModal from './EditSiteModal';

interface TableHeaderProps {
  subtitle?: string;
  title?: string;
  siteName?: string;
  addModal?: boolean;
  route?: string;
  isSiteOwner?: boolean;
  siteId?: string;
  settings?: any;
}

const TableHeader = ({
  subtitle,
  title,
  addModal = false,
  siteName,
  route,
  isSiteOwner,
  siteId,
  settings,
}: TableHeaderProps) => {

  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem isCurrentPage={!siteName}>
          <BreadcrumbLink
            color='gray.700'
            fontSize='sm'
            textTransform='capitalize'
            as='span'
          >
            <Link href={`/${subtitle?.toLowerCase()}`}>{subtitle}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {siteName && (
          <BreadcrumbItem isCurrentPage={!route}>
            <BreadcrumbLink
              color='gray.700'
              fontSize='sm'
              textTransform='capitalize'
              as='span'
            >
              <Link href={`/${subtitle?.toLowerCase()}`}>{siteName}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
        {siteName && route && (
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink
              color='gray.700'
              fontSize='sm'
              textTransform='capitalize'
            >
              {route}
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
      </Breadcrumb>
      <Flex justify='space-between' align='center' textTransform='capitalize'>
        <Heading mb={4}>{title}</Heading>
        {isSiteOwner && (
          <EditSiteModal text='Edit Site' settings={settings} siteId={siteId} />
        )}
        {addModal && <AddSiteModal text={'+ Add Site'} />}
      </Flex>
    </>
  );
};

export default TableHeader;
