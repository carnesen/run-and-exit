/**
 * Run a function or async function, console.log the result, and process.exit
 * @param fn A function or async function
 * @param args Arguments to pass to the function. Must be suitably typed.
 * @typeParam TArgs Type of the arguments
 */
export function runAndExit<TArgs extends any[]>(
	fn: (...args: TArgs) => any,
	...args: TArgs
): void {
	(async () => {
		try {
			const value = await fn(...args);
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
