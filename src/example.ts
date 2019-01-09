import runAndExit = require('.');

const concat = (a: string, b: string) => `${a}${b}`;

// runAndExit(concat, 'foo', 3);
runAndExit(concat, 'foo', 'bar');
