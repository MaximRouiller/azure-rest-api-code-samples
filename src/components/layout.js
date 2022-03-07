import React from 'react';
import { Link as GatsbyLink, useStaticQuery, graphql } from 'gatsby';
import { Box, Flex, Divider, Heading, Link } from '@chakra-ui/react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';

import ServicesDrawer from './servicesDrawer';

const Layout = ({ children, location }) => {
  const data = useStaticQuery(graphql`
    query {
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
  for (const crumb of location.pathname.split('/')) {
    crumbs.push({ crumb, link: crumbs[crumbs.length - 1].link + '/' + crumb });
  }

  return (
    <Box m='auto' maxW='70rem' p={5}>
      <GatsbyLink to='/'>
        <Heading fontSize={24}>Azure REST API Code Samples</Heading>
      </GatsbyLink>
      <Breadcrumb mt={2}>
        {crumbs.slice(crumbs[2].crumb ? 1 : 2).map(({ crumb, link }) => (
          <BreadcrumbItem key={link} isCurrentPage={link.slice(1) === location.pathname}>
            <BreadcrumbLink as={GatsbyLink} to={link !== '/' ? link.slice(1) : link}>
              {crumb || 'Home'}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
      <ServicesDrawer mt={2} display={{ base: 'block', md: 'none' }}>
        <ServiceLinks services={services} />
      </ServicesDrawer>
      <Flex mt={5}>
        <Flex
          direction='column'
          w='25%'
          display={{ base: 'none', md: 'flex' }}
          pr={5}
          position='sticky'
          height='80vh'
          top={5}
        >
          <Heading fontSize={20} mb={5}>
            Services
          </Heading>
          <ServiceLinks services={services} />
        </Flex>
        <Flex direction='column' w={{ base: '100%', md: '75%' }}>
          <main>{children}</main>
        </Flex>
      </Flex>
    </Box>
  );
};

const ServiceLinks = ({ services }) => (
  <Flex direction='column' overflowY='auto'>
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
  </Flex>
);

export default Layout;
