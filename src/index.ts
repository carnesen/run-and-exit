export function runAndExit<T extends any[]>(fn: (...args: T) => any, ...args: T): void {
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
