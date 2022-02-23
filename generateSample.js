const fs = require('fs');
const generator = require('../OACodeSampleGenerator'); // a temporary solution until we release the package on npm

module.exports = generateSample;

// Takes a specification url/path as the argument
async function generateSample(spec) {
  try {
    const output = await generator(spec);
    const { apiInfo } = output;

    console.log(`API name: ${apiInfo.title}, Version: ${apiInfo.version}`);

    fs.writeFileSync(
      `./samples/${apiInfo.title}_${apiInfo.version}.json`,
      JSON.stringify(output, null, 2)
    );
  } catch (err) {
    console.error(err);
  }
}

// Pass the url/path in as a third command line argument to run directly -> node generateSample spec
if (process.argv[2]) generateSample(process.argv[2]);
