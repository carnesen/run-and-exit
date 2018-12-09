type AsyncFunc<T extends any[]> = (...args: T) => Promise<any>;

export const runAndExit = async <T extends any[]>(
  asyncFunc: AsyncFunc<T>,
  ...args: T
) => {
  try {
    const value = await asyncFunc(...args);
    if (typeof value !== 'undefined') {
      console.log(value);
    }
    process.exit(0);
  } catch (ex) {
    console.log(ex);
    process.exit(1);
  }
};