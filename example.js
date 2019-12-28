// example.js
const { runAndExit } = require('.');
const { readFile } = require('fs');
const { promisify } = require('util');

runAndExit(async () => {
  const fileContents = await promisify(readFile)(__filename, 'utf8');
  console.log("By default the return value is console.log'ed too");
  return fileContents;
});
