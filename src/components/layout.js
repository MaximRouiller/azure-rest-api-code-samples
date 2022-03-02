import React, { useState, useEffect } from 'react';
import { Link as GatsbyLink, useStaticQuery, graphql } from 'gatsby';
import { Box, Flex, Stack, Divider, Heading, Link } from '@chakra-ui/react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { Radio, RadioGroup } from '@chakra-ui/react';

const Layout = ({ pageTitle, children, location }) => {
  const [defaultLanguage, setDefaultLanguage] = useState(
    localStorage.getItem('defaultLanguage') || 'Java'
  );

  useEffect(() => {
    localStorage.setItem('defaultLanguage', defaultLanguage);
  }, [defaultLanguage]);

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

  return (
    <Box m='auto' w='fit-content' p={5}>
      <title>
        {pageTitle} | {data.site.siteMetadata.title}
      </title>
      <Flex justify='space-between'>
        <GatsbyLink to='/'>
          <Heading fontSize={25}>Azure REST API Code Samples</Heading>
        </GatsbyLink>
        <Flex align='center'>
          <Heading fontSize={15} mr={4}>
            Default Language:
          </Heading>
          <RadioGroup value={defaultLanguage} onChange={setDefaultLanguage}>
            <Stack direction='row'>
              <Radio value='Java'>Java</Radio>
              <Radio value='Python'>Python</Radio>
              <Radio value='C#'>C#</Radio>
            </Stack>
          </RadioGroup>
        </Flex>
      </Flex>
      <Breadcrumb mt={2}>
        {crumbs.slice(1).map(({ crumb, link }) => (
          <BreadcrumbItem key={crumb} isCurrentPage={link.slice(1) === location.pathname}>
            <BreadcrumbLink as={GatsbyLink} to={link !== '/' ? link.slice(1) : link}>
              {crumb || 'Home'}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
      <Flex mt={5}>
        <Flex direction='column' w='20rem'>
          <Heading fontSize={20} mb={5}>
            Services
          </Heading>
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
        <Flex direction='column' ml={5} w='50rem'>
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
