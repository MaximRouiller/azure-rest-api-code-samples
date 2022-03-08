import React from 'react';
import { Helmet } from 'react-helmet';
import { Heading } from '@chakra-ui/react';

const TitleAndHeading = ({ title }) => {
  return (
    <>
      <Helmet>
        <title>{title} | Azure REST API Code Samples</title>
      </Helmet>
      <Heading fontSize={20} mb={5}>
        {title}
      </Heading>
    </>
  );
};

export default TitleAndHeading;
