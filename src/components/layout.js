import React from 'react';
import { Link as GatsbyLink, useStaticQuery, graphql } from 'gatsby';
import { Box, Flex, Divider, Heading, Link } from '@chakra-ui/react';

const Layout = ({ pageTitle, children }) => {
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
            apiInfo {
              title
            }
          }
        }
      }
    }
  `);

  const services = [];
  for (const edge of data.allSamplesJson.edges) {
    const { title } = edge.node.apiInfo;
    if (!services.find((s) => s === title)) services.push(title);
  }

  return (
    <Box m='auto' w='fit-content' p={5}>
      <title>
        {pageTitle} | {data.site.siteMetadata.title}
      </title>
      <GatsbyLink to='/'>
        <Heading fontSize={25}>Azure REST API Code Samples</Heading>
      </GatsbyLink>
      <Flex mt={5}>
        <Flex direction='column'>
          <Heading fontSize={20} mb={5}>
            Services
          </Heading>
          {services.map((title) => (
            <Box key={title}>
              <Link as={GatsbyLink} to={`/service/${title}`}>
                {title}
              </Link>
              <Divider my={2} />
            </Box>
          ))}
        </Flex>
        <Flex direction='column' ml={5} w='50rem'>
          <Heading fontSize={20} mb={5}>
            {pageTitle}
          </Heading>
          {children}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Layout;
