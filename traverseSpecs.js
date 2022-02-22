#!/usr/bin/env node
// @ts-check
/*
This JS script tranverses all specifications in azure-specifications

Note:
1: This script works with local directory instead of remote url, because
it is hard to identify if the subdirectory exist or not in url format. Thus,
we clone the specification repo into local machine and do the transversing.

2. This script filters out the examples and preview directory, because the examples 
directory contains just examples for the related json specifiction and the preview 
specifications are not stable.
*/

'use strict';

const fs = require('fs');
let dir = '/Users/fuyingbo/Desktop/azure-rest-api-specs/specification/';

let walk = function (dir) {
  let results = [];
  let list = fs.readdirSync(dir);
  list.forEach(function (file) {
    if (!file.endsWith('preview') && !file.endsWith('examples')) {
      file = dir + '/' + file;
      var stat = fs.statSync(file);
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

let jsonFiles = walk(dir);
for (let i in jsonFiles) {
  fs.writeFile(
    'test.sh',
    'node generateSample ' +
      jsonFiles[i].replace(
        '/Users/fuyingbo/Desktop/azure-rest-api-specs',
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
