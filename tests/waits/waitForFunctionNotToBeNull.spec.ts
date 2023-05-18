import {
  ActionReturnType,
  TestError,
  wait,
  waitForFunctionNotToBeNull,
} from '../../src';
import { wrapError } from './waitUtils.testKit';

describe('Waits: waitForFunctionValueNotToBeNull()', () => {
  it('resolves if function value is not null after wait', async () => {
    let result: ActionReturnType = null;
    const actionTimeout = 1000;
    const pollIntervalMs = 500;
    const changeVarFunc = async () => {
      await wait(actionTimeout);
      result = undefined;
      return result;
    };
    const nullReturnFunc = jest.fn(() => Promise.resolve(result));
    changeVarFunc();
    await expect(
      waitForFunctionNotToBeNull(nullReturnFunc, {
        pollIntervalMs,
      }),
    ).resolves.toBeUndefined();
    expect(nullReturnFunc).toHaveBeenCalledTimes(
      actionTimeout / pollIntervalMs + 1,
    );
  });

  it('rejects if function value is null after wait', async () => {
    const result = null;
    const nullReturnFunc = jest.fn(async () => result);
    const timeoutMs = 1000;
    const pollIntervalMs = 500;
    await expect(
      waitForFunctionNotToBeNull(nullReturnFunc, {
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
});
