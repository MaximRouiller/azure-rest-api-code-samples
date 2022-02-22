/*
This JS script tranverses all specifications in https://github.com/Azure/azure-rest-api-specs

Note:
1: This script works with local directory instead of remote url, because
it is hard to identify if the subdirectory exist or not in url format. Thus,
we clone the specification repo into local machine and do the traversing.

2. This script filters out the examples and preview directory, because the examples 
directory contains just examples for the related json specification and the preview 
specifications are not stable.
*/

const fs = require('fs');

const dir = '../azure-rest-api-specs'; // replace the path with your own if necessary

const walk = function (dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function (file) {
    if (!file.endsWith('preview') && !file.endsWith('examples')) {
      file = dir + '/' + file;
      const stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        /* Recurse into a subdirectory */
        results = results.concat(walk(file));
      } else {
        /* Is a JSON file */
        if (file.endsWith('.json')) results.push(file);
      }
    }
  });
  return results;
};

const jsonFiles = walk(dir + '/specification');
for (let i in jsonFiles) {
  fs.writeFile(
    'generateAllSamples.sh',
    'node generateSample ' +
      jsonFiles[i].replace(
        dir,
        'https://raw.githubusercontent.com/Azure/azure-rest-api-specs/main'
      ) +
      '\n',
    { flag: 'a+' },
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
    }
  );
}
