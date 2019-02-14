export function runAndExit<T extends any[]>(fn: (...args: T) => any, ...args: T) {
  (async () => {
    try {
      const value = await fn(...args);
      if (typeof value !== 'undefined') {
        console.log(value);
      }
      process.exit(0);
    } catch (ex) {
      console.log(ex);
      process.exit(1);
    }
  })();
}
