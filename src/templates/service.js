import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { Heading, Box, Divider, Link } from '@chakra-ui/react';

const ServicePage = ({ pageContext }) => {
  const { pageTitle, versions } = pageContext;

  return (
    <>
      <title>{pageTitle} | Azure REST API Code Samples</title>
      <Heading fontSize={20} mb={5}>
        {pageTitle}
      </Heading>
      {versions
        .sort((a, b) => b.localeCompare(a))
        .map((version) => (
          <Box key={version}>
            <Link as={GatsbyLink} to={`./${version}`}>
              {version}
            </Link>
            <Divider my={2} />
          </Box>
        ))}
    </>
  );
};

export default ServicePage;
