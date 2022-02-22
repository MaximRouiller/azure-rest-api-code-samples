/*
This JS script traverses all specifications in https://github.com/Azure/azure-rest-api-specs

Note:
1: This script works with a local clone of the repo instead of the remote repo, because
it is hard to identify if a given subdirectory exists when working with the remote. Thus,
we have to clone the specification repo into our local machine and then do the traversal.

2. This script filters out the 'examples' and 'preview' directories, because the examples 
directory contains just examples for the related json specification and the preview 
specifications are not stable.
*/

const fs = require('fs');

const dir = '../azure-rest-api-specs/specification'; // replace the path with your own if necessary

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
        /* Is a file */
        if (file.endsWith('.json')) results.push(file);
      }
    }
  });
  return results;
};

const jsonFiles = walk(dir);
for (let i in jsonFiles) {
  fs.writeFile(
    'generateAllSamples.sh',
    'node generateSample ' + jsonFiles[i] + '\n',
    { flag: 'a+' },
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
    }
  );
}
