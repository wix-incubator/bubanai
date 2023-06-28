import type { ActionReturnType } from '../../src';
import { TestError, wait, waitForFunctionNotToBeUndefined } from '../../src';
import { wrapError } from '../utils';

describe('Waits: waitForFunctionNotToBeUndefined()', () => {
  it('resolves if function value is not undefined after wait', async () => {
    let result: ActionReturnType = undefined;
    const actionTimeout = 1000;
    const pollIntervalMs = 500;
    const changeVarFunc = async () => {
      await wait(actionTimeout);
      result = false;
      return result;
    };
    const nullReturnFunc = jest.fn(() => Promise.resolve(result));
    changeVarFunc();
    await expect(
      waitForFunctionNotToBeUndefined(nullReturnFunc, {
        pollIntervalMs,
      }),
    ).resolves.toBeUndefined();
    expect(nullReturnFunc).toHaveBeenCalledTimes(
      actionTimeout / pollIntervalMs + 1,
    );
  });

  it('rejects if function value is undefined after wait', async () => {
    const result = undefined;
    const nullReturnFunc = jest.fn(async () => result);
    const timeoutMs = 1100;
    const pollIntervalMs = 500;
    await expect(
      waitForFunctionNotToBeUndefined(nullReturnFunc, {
        timeoutMs,
        pollIntervalMs,
      }),
    ).rejects.toThrowError(
      wrapError(
        await TestError.ObjectsNotToBeEqual(nullReturnFunc, result, timeoutMs),
        nullReturnFunc,
      ),
    );
    expect(nullReturnFunc).toHaveBeenCalledTimes(
      Math.round(timeoutMs / pollIntervalMs) + 1,
    );
  });
});
