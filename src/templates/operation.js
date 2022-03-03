import React, { useState, useEffect } from 'react';
import { Heading, Box, Button } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const languages = ['Java', 'Python', 'C#'];

const OperationPage = ({ pageContext }) => {
  const {
    service,
    version,
    operation: {
      operationId,
      javaSnippet,
      pythonSnippet,
      csharpSnippet,
      requestBody,
      javaModel,
      pythonModel,
      csharpModel,
    },
  } = pageContext;

  const [groupName, operationName] = operationId
    .split('_')
    .map((name) => name.split(/(?=[A-Z])/).join(' '));

  const pageTitle = `${service} - ${version} - ${groupName} - ${operationName}`;

  const [defaultLanguage, setDefaultLanguage] = useState('');

  useEffect(() => {
    setDefaultLanguage(localStorage.getItem('defaultLanguage') || 'Java');
  }, []);

  const onChangeTab = (index) => {
    localStorage.setItem('defaultLanguage', languages[index]);
    setDefaultLanguage(languages[index]);
  };

  return (
    <>
      <title>{pageTitle} | Azure REST API Code Samples</title>
      <Heading fontSize={20} mb={5}>
        {pageTitle}
      </Heading>
      <Heading fontSize={15} mb={2}>
        Request
      </Heading>
      {defaultLanguage && (
        <Tabs defaultIndex={languages.indexOf(defaultLanguage)} onChange={onChangeTab} mb={2}>
          <TabList>
            <Tab>Java</Tab>
            <Tab>Python</Tab>
            <Tab>C#</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SamplePanel sample={javaSnippet} language='java' />
            </TabPanel>
            <TabPanel>
              <SamplePanel sample={pythonSnippet} language='python' />
            </TabPanel>
            <TabPanel>
              <SamplePanel sample={csharpSnippet} language='csharp' />
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}

      {requestBody && (
        <>
          <Heading fontSize={15} my={2}>
            Request Body
          </Heading>
          <Tabs mb={2}>
            <TabList>
              <Tab>JSON</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SamplePanel sample={requestBody} language='json' />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </>
      )}

      {defaultLanguage && javaModel && pythonModel && csharpModel && (
        <>
          <Heading fontSize={15} my={2}>
            Response Model
          </Heading>
          <Tabs defaultIndex={languages.indexOf(defaultLanguage)} onChange={onChangeTab}>
            <TabList>
              <Tab>Java</Tab>
              <Tab>Python</Tab>
              <Tab>C#</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SamplePanel sample={javaModel} language='java' />
              </TabPanel>
              <TabPanel>
                <SamplePanel sample={pythonModel} language='python' />
              </TabPanel>
              <TabPanel>
                <SamplePanel sample={csharpModel} language='csharp' />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </>
      )}
    </>
  );
};

const SamplePanel = ({ sample, language }) => {
  const [showCopied, setShowCopied] = useState(false);

  const onCopy = () => {
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <Box position='relative'>
      <CopyToClipboard text={sample} onCopy={onCopy}>
        <Button size='sm' colorScheme='blue' position='absolute' top={2} right={2}>
          {showCopied ? 'Copied' : 'Copy'}
        </Button>
      </CopyToClipboard>
      <SyntaxHighlighter language={language} style={docco}>
        {sample}
      </SyntaxHighlighter>
    </Box>
  );
};

export default OperationPage;
