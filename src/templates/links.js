import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { Box, Divider, Link } from '@chakra-ui/react';

import TitleAndHeading from '../components/titleAndHeading';

const LinksPage = ({ pageContext }) => {
  const { pageTitle, links, reverse } = pageContext;

  return (
    <>
      <TitleAndHeading title={pageTitle} />
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
