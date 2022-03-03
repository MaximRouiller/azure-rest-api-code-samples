import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { Heading, Flex, Divider, Link } from '@chakra-ui/react';

const VersionPage = ({ pageContext }) => {
  const { service, version, generated } = pageContext;

  const pageTitle = `${service} - ${version}`;

  const groups = [];
  for (const { operationId } of generated) {
    const [groupName, operationName] = operationId.split('_');
    const group = groups.find((g) => g.groupName === groupName);
    if (group) {
      group.operations.push(operationName);
    } else {
      groups.push({ groupName, operations: [operationName] });
    }
  }

  return (
    <>
      <title>{pageTitle} | Azure REST API Code Samples</title>
      <Heading fontSize={20} mb={5}>
        {pageTitle}
      </Heading>
      {groups
        .sort((a, b) => a.groupName.localeCompare(b.groupName))
        .map(({ groupName, operations }) => (
          <Flex direction='column' key={groupName}>
            <Heading fontSize={15} mb={4}>
              {groupName.split(/(?=[A-Z])/).join(' ')}
            </Heading>
            {operations
              .sort((a, b) => a.localeCompare(b))
              .map((operation) => (
                <Link as={GatsbyLink} to={`./${groupName}_${operation}`} key={operation} mb={2}>
                  {operation.split(/(?=[A-Z])/).join(' ')}
                </Link>
              ))}
            <Divider mt={2} mb={4} />
          </Flex>
        ))}
    </>
  );
};

export default VersionPage;
