import { TestError, waitForObjectsToBeEqual } from '../../src';
import { wrapError } from './waitUtils.testKit';

describe('Waits: waitForObjectsToBeEqual()', () => {
  it('resolves if objects are equal after wait', async () => {
    const result: { [k: string]: number } = { a: 1 };
    const actionTimeout = 1000;
    const pollIntervalMs = 500;

    setTimeout(() => (result['b'] = 2), actionTimeout + 300);
    const returnFunc = jest.fn(async () => result);
    await expect(
      waitForObjectsToBeEqual(returnFunc, { b: 2, ...result }, returnFunc, {
        pollIntervalMs,
      }),
    ).resolves.toBeUndefined();
    expect(returnFunc).toHaveBeenCalledTimes(
      actionTimeout / pollIntervalMs + 2,
    );
  });

  it('rejects if function objects are NOT still equal after wait', async () => {
    const result: any = '';
    const falseReturnFunc = jest.fn(async () => false);
    const timeoutMs = 1100;
    const pollIntervalMs = 500;
    await expect(
      waitForObjectsToBeEqual(falseReturnFunc, result, falseReturnFunc, {
        timeoutMs,
        pollIntervalMs,
      }),
    ).rejects.toThrowError(
      wrapError(
        await TestError.ObjectsToBeEqual(falseReturnFunc, result, timeoutMs),
        falseReturnFunc,
      ),
    );
    expect(falseReturnFunc).toHaveBeenCalledTimes(
      Math.round(timeoutMs / pollIntervalMs) + 3,
    );
  });

  it('resolves if function throws exceptions and expected objects are undefined', async () => {
    const result = undefined;
    const actionTimeout = 1000;
    const pollIntervalMs = 500;
    let exceptionCondition = false;
    setTimeout(() => (exceptionCondition = true), actionTimeout);
    const returnFunc = jest.fn(async () => {
      if (exceptionCondition) {
        throw new Error();
      }
      return null;
    });
    await expect(
      waitForObjectsToBeEqual(returnFunc, result, returnFunc, {
        pollIntervalMs,
      }),
    ).resolves.toBeUndefined();
    expect(returnFunc).toHaveBeenCalledTimes(
      actionTimeout / pollIntervalMs + 1,
    );
  });
});
