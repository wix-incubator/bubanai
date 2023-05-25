import { TestError, wait, waitWithAttempts } from '../../src';
import { wrapError } from './waitUtils.testKit';

describe('Waits: waitWithAttempts()', () => {
  it('resolves if function value is not undefined after wait with expected value', async () => {
    let result;
    const options = { attempts: 3, interval: 500 };
    const changeVarFunc = async () => {
      await wait((options.attempts - 1) * options.interval - 200);
      result = true;
      return result;
    };
    const booleanReturnFunc = jest.fn(() => Promise.resolve(result));
    changeVarFunc();
    await expect(waitWithAttempts(booleanReturnFunc, options)).resolves.toEqual(
      true,
    );
    expect(booleanReturnFunc).toHaveBeenCalledTimes(options.attempts);
  });

  it('rejects if function value is not true after wait', async () => {
    let result;
    const options = { attempts: 2, interval: 500 };
    const booleanReturnFunc = jest.fn(async () => result);
    await expect(
      waitWithAttempts(booleanReturnFunc, options),
    ).rejects.toThrowError(
      wrapError(
        TestError.WithAttempts(options.attempts, options.interval),
        booleanReturnFunc,
      ),
    );
    expect(booleanReturnFunc).toHaveBeenCalledTimes(options.attempts);
  });

  it('resolves simultaneously if function return value is not undefined', async () => {
    const result = { a: 1 };
    const returnFunc = jest.fn(async () => result);
    await expect(waitWithAttempts(returnFunc)).resolves.toEqual(result);
    expect(returnFunc).toHaveBeenCalledTimes(1);
  });

  it('should throw custom error message on reject with custom condition', async () => {
    const result = { a: 1 };
    const options = { attempts: 2, interval: 500, assertCondition: result };
    const booleanReturnFunc = jest.fn(async () => result);
    const errorMessage = 'Custom error message';
    await expect(
      waitWithAttempts(booleanReturnFunc, options, errorMessage),
    ).rejects.toThrowError(wrapError(errorMessage, booleanReturnFunc));
  });

  it('should resolve if function value is not equal custom condition', async () => {
    let result: any = true;
    const options = { attempts: 2, interval: 500, assertCondition: true };
    const changeVarFunc = async () => {
      await wait((options.attempts - 1) * options.interval - 200);
      result = [1, 2, 3];
      return result;
    };
    const returnFunc = jest.fn(async () => result);
    changeVarFunc();
    await expect(waitWithAttempts(returnFunc, options)).resolves.toEqual([
      1, 2, 3,
    ]);
    expect(returnFunc).toHaveBeenCalledTimes(options.attempts);
  });
});
