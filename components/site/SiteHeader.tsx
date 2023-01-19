import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import EditSiteModal from '../common/EditSiteModal';

interface TableHeaderProps {
  site: Site;
  route?: string;
  isSiteOwner?: boolean;
  siteId?: string;
}

const SiteHeader = ({
  isSiteOwner,
  site,
  siteId,
  route,
}: TableHeaderProps) => {
  const siteName = site?.name;
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
            <Link href='/sites'>Sites </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink
            color='gray.700'
            fontSize='sm'
            textTransform='capitalize'
            as='span'
          >
            <Link href={`/site/${siteId}`}>{siteName || '-'}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {siteName && route && (
          <BreadcrumbItem>
            <BreadcrumbLink
              color='gray.700'
              fontSize='sm'
              textTransform='capitalize'
              as='span'
            >
              <Link href={`/site/${siteId}/${route}`}>{route}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
      </Breadcrumb>
      <Flex justifyContent='space-between'>
        <Heading mb={8}>{siteName || '-'}</Heading>
        {isSiteOwner && (
          <EditSiteModal
            settings={site?.settings}
            siteId={siteId}
            text='Edit Site'
          />
        )}
      </Flex>
    </>
  );
};

export default SiteHeader;
