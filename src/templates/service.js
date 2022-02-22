import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { Box, Flex, Divider, Link } from '@chakra-ui/react';

import Layout from '../components/layout';

const ServicePage = ({ pageContext, location }) => {
  const { title, versions } = pageContext;

  return (
    <Layout pageTitle={title} location={location}>
      <Flex direction='column'>
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
      </Flex>
    </Layout>
  );
};

export default ServicePage;
