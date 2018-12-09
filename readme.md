# @carnesen/run-and-exit

> Runs an async function, console.log's the resolved/rejected value, and process.exit's

## Install

```
$ npm install --save @carnesen/run-and-exit
```

## TypeScript example

```ts
// example.ts
import { runAndExit } from '@carnesen/run-and-exit';

const asyncFunc = async (a: string, b: string) => `${a}-${b}`;

runAndExit(asyncFunc, 'foo', 'bar');
```

```
$ ts-node example.ts
foo-bar
$ echo $?
0
```

## JavaScript example

```js
// example.js
const { runAndExit } = require('@carnesen/run-and-exit');

runAndExit(async () => {
  throw new Error('Oops');
});
```

```
$ node example.js
Error: Oops
    at runAndExit (/Users/chrisarnesen/GitHub/run-and-exit/lib/example.1.js:4:11)
    at exports.runAndExit (/Users/chrisarnesen/GitHub/run-and-exit/lib/index.js:5:29)
    ...
$ echo $?
1
```

## API

### runAndExit(asyncFunc, ...args)

#### version

Type: `function`

A function that returns a promise.

#### args

Type: `any`

Arguments passed in when asyncFunc is invoked

## License

MIT © [Chris Arnesen](https://www.carnesen.com)