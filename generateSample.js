const fs = require('fs');
const path = require('path');
const generator = require('../OACodeSampleGenerator'); // a temporary solution until we release the package on npm

module.exports = generateSample;

// Takes a specification url/path as the argument
async function generateSample(spec) {
  try {
    const service = spec.split('Microsoft.')[1].split('/')[0];
    const version = spec.split('stable/')[1].split('/')[0];
    const specName = path.basename(spec).split('.')[0];

    const samplePath = `./samples/${service}~${version}~${specName}.json`;

    const generated = (await generator(spec)).generated.map((operation) => {
      const [groupName, operationName] = capitalise(operation.operationId).split('_');
      return {
        groupName: splitAndJoin(groupName),
        operationName: operationName ? splitAndJoin(operationName) : splitAndJoin(groupName),
        ...operation,
      };
    });

    fs.writeFileSync(
      samplePath,
      JSON.stringify({ service, version, specName, generated }, null, 2)
    );

    console.log(samplePath);
    return samplePath;
  } catch (err) {
    console.error(err);
    return err.toString();
  }
}

// Pass the url/path in as a third command line argument to run directly -> node generateSample spec
if (process.argv[2]) generateSample(process.argv[2]);

// Utilities

const capitalise = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const splitAndJoin = (s, split = /(?=[A-Z])/, join = '-') => s.split(split).join(join);
