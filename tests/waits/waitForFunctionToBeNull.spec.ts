import type { ActionReturnType } from '../../src';
import { TestError, wait, waitForFunctionToBeNull } from '../../src';
import { wrapError } from '../utils';

describe('Waits: waitForFunctionToBeNull()', () => {
  it('resolves if function value is null after wait', async () => {
    let result: ActionReturnType = undefined;
    const actionTimeout = 1000;
    const pollIntervalMs = 500;
    const changeVarFunc = async () => {
      await wait(actionTimeout);
      result = null;
      return result;
    };
    const nullReturnFunc = jest.fn(() => Promise.resolve(result));
    changeVarFunc();
    await expect(
      waitForFunctionToBeNull(nullReturnFunc, {
        pollIntervalMs,
      }),
    ).resolves.toBeUndefined();
    expect(nullReturnFunc).toHaveBeenCalledTimes(
      actionTimeout / pollIntervalMs + 1,
    );
  });

  it('rejects if function value is NOT null after wait', async () => {
    const result = false;
    const nullReturnFunc = jest.fn(async () => result);
    const timeoutMs = 1100;
    const pollIntervalMs = 500;
    await expect(
      waitForFunctionToBeNull(nullReturnFunc, {
        timeoutMs,
        pollIntervalMs,
      }),
    ).rejects.toThrow(
      wrapError(
        await TestError.ObjectsToBeEqual(nullReturnFunc, null, timeoutMs),
        nullReturnFunc,
      ),
    );
    expect(nullReturnFunc).toHaveBeenCalledTimes(
      Math.floor(timeoutMs / pollIntervalMs) + 3,
    );
  });
});
