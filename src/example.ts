import { runAndExit } from '.';

const concat = (a: string, b: string) => `${a}${b}`;

runAndExit(concat, 'foo', 'bar');
