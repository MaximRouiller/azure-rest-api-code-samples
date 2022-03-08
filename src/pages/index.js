import React from 'react';
import { Text, Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

import TitleAndHeading from '../components/titleAndHeading';

const IndexPage = () => {
  return (
    <>
      <TitleAndHeading title={'Home'} />
      <Text mb={2}>
        Pick an Azure service and one of its operations to view code samples for its REST API.
      </Text>
      <Text mb={2}>
        This site acts as a supplement to the{' '}
        <Link href='https://docs.microsoft.com/en-us/rest/api/azure/' isExternal>
          official reference documentation <ExternalLinkIcon mx='2px' />
        </Link>
        .
      </Text>
      <Text>
        The code samples found on this site have been generated from the{' '}
        <Link href='https://github.com/Azure/azure-rest-api-specs' isExternal>
          specifications on GitHub <ExternalLinkIcon mx='2px' />
        </Link>
        .
      </Text>
    </>
  );
};

export default IndexPage;
