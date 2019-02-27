#!/usr/bin/env node
var fs = require("fs");
var ChromeExtension = require("crx");
var crx = new ChromeExtension({
  codebase: 'https://github.com/' + process.env.TRAVIS_REPO_SLUG + '/releases/download/' + process.env.TRAVIS_TAG + '/chromeipass.crx',
  privateKey: fs.readFileSync(process.env.HOME+'/chrome-extension-key.pem')
});

crx.load(['./manifest.json'])
  .then(crx => crx.pack())
  .then(crxBuffer => {
    // ...
    const xmlBuffer = crx.generateUpdateXML();
    fs.writeFile('./update.xml', xmlBuffer);
  });
