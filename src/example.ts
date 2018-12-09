import { runAndExit } from '.';

const asyncFunc = async (a: string, b: string) => `${a}-${b}`;

runAndExit(asyncFunc, 'foo', 'bar');
