import {
  ActionReturnType,
  TestError,
  wait,
  waitForFunctionToBeUndefined,
} from '../../src';
import { wrapError } from '../utils';

describe('Waits: waitForFunctionToBeUndefined()', () => {
  it('resolves if function value is undefined after wait', async () => {
    let result: ActionReturnType = false;
    const actionTimeout = 1000;
    const pollIntervalMs = 500;
    const changeVarFunc = async () => {
      await wait(actionTimeout);
      result = undefined;
      return result;
    };
    const undefinedReturnFunc = jest.fn(() => Promise.resolve(result));
    changeVarFunc();
    await expect(
      waitForFunctionToBeUndefined(undefinedReturnFunc, {
        pollIntervalMs,
      }),
    ).resolves.toBeUndefined();
    expect(undefinedReturnFunc).toHaveBeenCalledTimes(
      actionTimeout / pollIntervalMs + 1,
    );
  });

  it('rejects if function value is NOT undefined after wait', async () => {
    const result = null;
    const nullReturnFunc = jest.fn(async () => result);
    const timeoutMs = 1000;
    const pollIntervalMs = 500;
    await expect(
      waitForFunctionToBeUndefined(nullReturnFunc, {
        timeoutMs,
        pollIntervalMs,
      }),
    ).rejects.toThrowError(
      wrapError(
        await TestError.ObjectsToBeEqual(nullReturnFunc, undefined, timeoutMs),
        nullReturnFunc,
      ),
    );
    expect(nullReturnFunc).toHaveBeenCalledTimes(
      timeoutMs / pollIntervalMs + 2,
    );
  });
});
