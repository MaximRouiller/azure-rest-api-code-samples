import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { Heading, Box, Divider, Link } from '@chakra-ui/react';

const VersionPage = ({ pageContext }) => {
  const { pageTitle, operationGroups } = pageContext;

  return (
    <>
      <title>{pageTitle} | Azure REST API Code Samples</title>
      <Heading fontSize={20} mb={5}>
        {pageTitle}
      </Heading>
      {operationGroups
        .sort((a, b) => a.localeCompare(b))
        .map((group) => (
          <Box key={group}>
            <Link as={GatsbyLink} to={`./${group}`}>
              {group}
            </Link>
            <Divider my={2} />
          </Box>
        ))}
    </>
  );
};

export default VersionPage;
