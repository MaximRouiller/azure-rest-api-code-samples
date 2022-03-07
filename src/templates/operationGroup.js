import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { Heading, Box, Divider, Link } from '@chakra-ui/react';

const OperationGroupPage = ({ pageContext }) => {
  const { pageTitle, operations } = pageContext;

  return (
    <>
      <title>{pageTitle} | Azure REST API Code Samples</title>
      <Heading fontSize={20} mb={5}>
        {pageTitle}
      </Heading>
      {operations
        .sort((a, b) => a.localeCompare(b))
        .map((operation) => (
          <Box key={operation}>
            <Link as={GatsbyLink} to={`./${operation}`}>
              {operation}
            </Link>
            <Divider my={2} />
          </Box>
        ))}
    </>
  );
};

export default OperationGroupPage;
