import { runAndExit } from '.';

const createMocks = (value: any) => {
  const fn = jest.fn().mockReturnValue(value);
  const exit = jest.spyOn(process, 'exit').mockImplementationOnce(() => {});
  const log = jest.spyOn(console, 'log').mockImplementationOnce(() => {});
  const restoreAll = () => {
    fn.mockRestore();
    exit.mockRestore();
    log.mockRestore();
  };
  return { fn, exit, log, restoreAll };
};

it('calls the provided function with the provided args, if any', async () => {
  const mocks = createMocks(Promise.resolve());
  const arg0 = {};
  const arg1 = {};
  await runAndExit(mocks.fn, arg0, arg1);
  expect(mocks.fn).toHaveBeenCalledWith(arg0, arg1);
  mocks.restoreAll();
});

it('calls process.exit(1) and console.log(err) on error', async () => {
  const err = new Error();
  const mocks = createMocks(Promise.reject(err));
  await runAndExit(mocks.fn);
  expect(mocks.log).toHaveBeenCalledWith(err);
  expect(mocks.exit).toHaveBeenCalledWith(1);
  mocks.restoreAll();
});

it('calls process.exit(0) on success', async () => {
  const mocks = createMocks(Promise.resolve());
  await runAndExit(mocks.fn);
  expect(mocks.exit).toHaveBeenCalledWith(0);
  mocks.restoreAll();
});

it('calls console.log(value) if resolved value is defined', async () => {
  const value = 'Success!';
  const mocks = createMocks(Promise.resolve(value));
  await runAndExit(mocks.fn);
  expect(mocks.log).toHaveBeenCalledWith(value);
  mocks.restoreAll();
});

it('does not call console.log if resolved value is not defined', async () => {
  const mocks = createMocks(Promise.resolve());
  await runAndExit(mocks.fn);
  expect(mocks.log).toHaveBeenCalledTimes(0);
  mocks.restoreAll();
});

it('works with synchronous function too', async () => {
  const mocks = createMocks('foo');
  await runAndExit(mocks.fn);
  expect(mocks.log).toHaveBeenCalledWith('foo');
  mocks.restoreAll();
});
