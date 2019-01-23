# @carnesen/run-and-exit [![Build Status](https://travis-ci.com/carnesen/run-and-exit.svg?branch=master)](https://travis-ci.com/carnesen/run-and-exit)

Run a function, `console.log` the returned/resolved/thrown/rejected value, and `process.exit`

## Install

```
$ npm install @carnesen/run-and-exit
```
This package includes runtime JavaScript files suitable for Node.js >=8 as well as the corresponding TypeScript type declarations.

## Usage
Here's a JavaScript example with an `async` function that fails:

```js
// example.js
const { runAndExit } = require('@carnesen/run-and-exit');
const { readFile } = require('fs');
const { promisify } = require('util');

runAndExit(async () => {
  const fileContents = await promisify(readFile)('/foo/bar/baz', 'utf8');
  return fileContents;
});
```

```
$ node example.js
{ Error: ENOENT: no such file or directory, open '/foo/bar/baz'
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: '/foo/bar/baz' }
$ echo $?
1
```

Here's a TypeScript example with a synchronous function that succeeds:

```ts
// example.ts
import { runAndExit } from '@carnesen/run-and-exit';

const concat = (a: string, b: string) => `${a}-${b}`;
runAndExit(concat, 'foo', 'bar');
```

```
$ ts-node example.ts
foo-bar
$ echo $?
0
```
`runAndExit` is intelligently typed in the sense that, continuing the previous example, the TypeScript compiler would complain if you tried this:
```ts
// NOT OK
runAndExit(concat, 'foo', 3);
// ^^ error TS2345: Argument of type '3' is not assignable to parameter of type 'string'.
```
This is achieved using ["rest elements in tuple types"](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#rest-elements-in-tuple-types), new in TypeScript 3.0. If you're using an older version of TypeScript, `runAndExit` may not work as advertised here.

## API

### runAndExit(fn, ...args)

Runs the provided function `fn` with arguments `args`.

#### fn

A function. Can return/throw a value synchronously or return a `Promise` (e.g. an `async` function). If `fn` throws or returns a promise that rejects, the exception is `console.log`ged and then `process.exit(1)` is called. In particular this means that if you don't want a show a stack trace in the terminal, `fn` should throw a string instead of an `Error` object. If `fn` returns a non-`Promise` value or a `Promise` that resolves, the value is `console.log`ged and then `process.exit(0)` is called.

#### args

Arguments passed to `fn`. If using TypeScript, `args` must be assignable to the parameter types of `fn` just as if you were calling `fn(args)` directly.

## More information
This micro-package has a half dozen unit tests with 100% coverage. If you want to see more examples of how it works, [those tests](src/__tests__) would be a good place to start. If you encounter any bugs or have any questions or feature requests, please don't hesitate to file an issue or submit a pull request on this project's repository on GitHub.

## Related

- [@carnesen/cli](https://github.com/carnesen/cli): A library for building Node.js command-line interfaces

- [@carnesen/coded-error](https://github.com/carnesen/coded-error): An enhanced `Error` class with additional properties "code" and "data"

## License

MIT © [Chris Arnesen](https://www.carnesen.com)
