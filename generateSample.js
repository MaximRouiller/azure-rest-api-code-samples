const fs = require('fs');
const path = require('path');
const generator = require('../OACodeSampleGenerator'); // a temporary solution until we release the package on npm

module.exports = generateSample;

// Takes a specification url/path as the argument
async function generateSample(spec) {
  try {
    let output = await generator(spec);
    const specName = path.basename(spec).split('.')[0];
    const service = spec.split('Microsoft.')[1].split('/')[0];
    output = { apiInfo: output.apiInfo, specName, service, generated: output.generated };

    const {
      apiInfo: { title, version },
    } = output;

    console.log(
      `API name: ${title}, Version: ${version}, Spec name: ${specName}, Service: ${service}`
    );

    fs.writeFileSync(
      `./samples/${title}_${version}_${specName}.json`,
      JSON.stringify(output, null, 2)
    );
  } catch (err) {
    console.error(err);
  }
}

// Pass the url/path in as a third command line argument to run directly -> node generateSample spec
if (process.argv[2]) generateSample(process.argv[2]);
