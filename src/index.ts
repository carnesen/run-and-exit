/**
 * Run a function or async function, console.log the result, and process.exit
 * @param fn A function or async function
 * @param fnArgs Arguments to pass to the function. Must be suitably typed.
 * @typeParam TArgs Type of the arguments. Inferred from fn.
 */
export function runAndExit<TArgs extends any[]>(
	fn: (...args: TArgs) => any,
	...fnArgs: TArgs
): void {
	(async () => {
		try {
			const value = await fn(...fnArgs);
			if (typeof value !== 'undefined') {
				console.log(value); // eslint-disable-line no-console
			}
			process.exit(0);
		} catch (ex) {
			console.log(ex); // eslint-disable-line no-console
			process.exit(1);
		}
	})();
}
