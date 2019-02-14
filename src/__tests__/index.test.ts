import { runAndExit } from '..';

const createMocks = (value: any, done: () => void) => {
  const fn = jest.fn().mockReturnValue(value);
  const exit = jest.spyOn(process, 'exit').mockImplementationOnce(() => {
    done();
    return undefined as never;
  });
  const log = jest.spyOn(console, 'log').mockImplementationOnce(() => {});
  const restoreAll = () => {
    fn.mockRestore();
    exit.mockRestore();
    log.mockRestore();
  };
  return { fn, exit, log, restoreAll };
};

describe(runAndExit.name, () => {
  it('calls the provided function with the provided args, if any', done => {
    const arg0 = {};
    const arg1 = {};
    const mocks = createMocks(Promise.resolve(), () => {
      expect(mocks.fn).toHaveBeenCalledWith(arg0, arg1);
      mocks.restoreAll();
      done();
    });
    runAndExit(mocks.fn, arg0, arg1);
  });

  it('calls process.exit(1) and console.log(err) on error', done => {
    const err = new Error();
    const mocks = createMocks(Promise.reject(err), () => {
      expect(mocks.log).toHaveBeenCalledWith(err);
      expect(mocks.exit).toHaveBeenCalledWith(1);
      mocks.restoreAll();
      done();
    });
    runAndExit(mocks.fn);
  });

  it('calls process.exit(0) on success', done => {
    const mocks = createMocks(Promise.resolve(), () => {
      expect(mocks.exit).toHaveBeenCalledWith(0);
      mocks.restoreAll();
      done();
    });
    runAndExit(mocks.fn);
  });

  it('calls console.log(value) if resolved value is defined', done => {
    const value = 'Success!';
    const mocks = createMocks(Promise.resolve(value), () => {
      expect(mocks.log).toHaveBeenCalledWith(value);
      mocks.restoreAll();
      done();
    });
    runAndExit(mocks.fn);
  });

  it('does not call console.log if resolved value is not defined', done => {
    const mocks = createMocks(Promise.resolve(), () => {
      expect(mocks.log).toHaveBeenCalledTimes(0);
      mocks.restoreAll();
      done();
    });
    runAndExit(mocks.fn);
  });

  it('works with synchronous function too', done => {
    const mocks = createMocks('foo', () => {
      expect(mocks.log).toHaveBeenCalledWith('foo');
      mocks.restoreAll();
      done();
    });
    runAndExit(mocks.fn);
  });
});
