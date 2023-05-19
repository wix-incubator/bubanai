import { TestError, waitForObjectsNotToBeEqual } from '../../src';
import { wrapError } from './waitUtils.testKit';

describe('Waits: waitForObjectsNotToBeEqual()', () => {
  it('resolves if objects are not equal after wait', async () => {
    const result: { [k: string]: number } = { a: 1 };
    const actionTimeout = 1000;
    const pollIntervalMs = 500;

    setTimeout(() => (result['b'] = 2), actionTimeout + 300);
    const returnFunc = jest.fn(async () => result);
    await expect(
      waitForObjectsNotToBeEqual(returnFunc, { ...result }, returnFunc, {
        pollIntervalMs,
      }),
    ).resolves.toBeUndefined();
    expect(returnFunc).toHaveBeenCalledTimes(
      actionTimeout / pollIntervalMs + 2,
    );
  });

  it('rejects if function objects are still equal after wait', async () => {
    const result = null;
    const nullReturnFunc = jest.fn(async () => result);
    const timeoutMs = 1000;
    const pollIntervalMs = 500;
    await expect(
      waitForObjectsNotToBeEqual(nullReturnFunc, result, nullReturnFunc, {
        timeoutMs,
        pollIntervalMs,
      }),
    ).rejects.toThrowError(
      wrapError(
        await TestError.ObjectsNotToBeEqual(nullReturnFunc, result, timeoutMs),
        nullReturnFunc,
      ),
    );
    expect(nullReturnFunc).toHaveBeenCalledTimes(timeoutMs / pollIntervalMs);
  });

  it('resolves if function throws exceptions and expected object is not undefined', async () => {
    const result: { [k: string]: number } = { a: 1 };
    const actionTimeout = 1000;
    const pollIntervalMs = 500;
    let exceptionCondition = false;
    setTimeout(() => (exceptionCondition = true), actionTimeout);
    const returnFunc = jest.fn(async () => {
      if (exceptionCondition) {
        throw new Error();
      }
      return result;
    });
    await expect(
      waitForObjectsNotToBeEqual(returnFunc, result, returnFunc, {
        pollIntervalMs,
      }),
    ).resolves.toBeUndefined();
    expect(returnFunc).toHaveBeenCalledTimes(
      actionTimeout / pollIntervalMs + 1,
    );
  });
});
