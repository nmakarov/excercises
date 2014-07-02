var Promise = require('promise');
var readFile = Promise.denodeify(require('fs').readFile);

function readJSON(filename, callback) {
  return readFile(filename, 'utf8').then(JSON.parse).nodeify(callback);
}

module.exports.readJSON = readJSON;

// readJSON("file.json", console.log);