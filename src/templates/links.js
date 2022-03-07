import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { Heading, Box, Divider, Link } from '@chakra-ui/react';

const LinksPage = ({ pageContext }) => {
  const { pageTitle, links, reverse } = pageContext;

  return (
    <>
      <title>{pageTitle} | Azure REST API Code Samples</title>
      <Heading fontSize={20} mb={5}>
        {pageTitle}
      </Heading>
      {links
        .sort((a, b) => (reverse ? b.localeCompare(a) : a.localeCompare(b)))
        .map((link) => (
          <Box key={link}>
            <Link as={GatsbyLink} to={`./${link}`}>
              {link}
            </Link>
            <Divider my={2} />
          </Box>
        ))}
    </>
  );
};

export default LinksPage;
