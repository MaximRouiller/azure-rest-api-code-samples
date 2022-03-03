import React from 'react';
import { Link as GatsbyLink, useStaticQuery, graphql } from 'gatsby';
import { Box, Flex, Divider, Heading, Link } from '@chakra-ui/react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';

import ServicesDrawer from './servicesDrawer';

const Layout = ({ pageTitle, children, location }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      allSamplesJson {
        edges {
          node {
            service
          }
        }
      }
    }
  `);

  const services = [];
  for (const edge of data.allSamplesJson.edges) {
    const service = edge.node.service;
    if (!services.find((s) => s === service)) services.push(service);
  }

  const crumbs = [{ crumb: '', link: '' }];
  for (const crumb of [...new Set(location.pathname.split('/'))]) {
    crumbs.push({ crumb, link: crumbs[crumbs.length - 1].link + '/' + crumb });
  }

  const ServiceLinks = () => (
    <>
      {services
        .sort((a, b) => a.localeCompare(b))
        .map((service) => (
          <Box key={service}>
            <Link as={GatsbyLink} to={`/${service}`}>
              {service}
            </Link>
            <Divider my={2} />
          </Box>
        ))}
    </>
  );

  return (
    <Box m='auto' maxW='70rem' p={5}>
      <title>
        {pageTitle} | {data.site.siteMetadata.title}
      </title>
      <GatsbyLink to='/'>
        <Heading fontSize={24}>Azure REST API Code Samples</Heading>
      </GatsbyLink>
      <Breadcrumb mt={2}>
        {crumbs.slice(1).map(({ crumb, link }) => (
          <BreadcrumbItem key={crumb} isCurrentPage={link.slice(1) === location.pathname}>
            <BreadcrumbLink as={GatsbyLink} to={link !== '/' ? link.slice(1) : link}>
              {crumb || 'Home'}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
      <ServicesDrawer mt={2} display={{ base: 'block', md: 'none' }}>
        <ServiceLinks />
      </ServicesDrawer>
      <Flex mt={5}>
        <Flex
          direction='column'
          w='25%'
          display={{ base: 'none', md: 'flex' }}
          mr={5}
          position='sticky'
          height='80vh'
          top={5}
        >
          <Heading fontSize={20} mb={5}>
            Services
          </Heading>
          <ServiceLinks />
        </Flex>
        <Flex direction='column' w={{ base: '100%', md: '75%' }}>
          <main>
            <Heading fontSize={20} mb={5}>
              {pageTitle}
            </Heading>
            {children}
          </main>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Layout;
