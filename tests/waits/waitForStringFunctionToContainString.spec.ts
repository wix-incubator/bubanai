import {
  TestError,
  wait,
  waitForStringFunctionToContainString,
} from '../../src';
import { wrapError } from '../utils';

describe('Waits: waitForStringFunctionToContainString()', () => {
  it('resolves if function value contains string after wait', async () => {
    let result = 'st';
    const secondString = '1s';
    const actionTimeout = 1000;
    const pollIntervalMs = 500;
    const changeVarFunc = async () => {
      await wait(actionTimeout);
      result += secondString;
      return result;
    };
    const stringReturnFunc = jest.fn(() => Promise.resolve(result));
    changeVarFunc();
    await expect(
      waitForStringFunctionToContainString(stringReturnFunc, secondString, {
        pollIntervalMs,
      }),
    ).resolves.toBeUndefined();
    expect(stringReturnFunc).toHaveBeenCalledTimes(
      actionTimeout / pollIntervalMs + 1,
    );
  });

  it('rejects if function value does NOT contain string after wait', async () => {
    const result = 'string1';
    const containValue = 'ring11';
    const stringReturnFunc = jest.fn(async () => result);
    const timeoutMs = 1000;
    const pollIntervalMs = 500;
    await expect(
      waitForStringFunctionToContainString(stringReturnFunc, containValue, {
        timeoutMs,
        pollIntervalMs,
      }),
    ).rejects.toThrowError(
      wrapError(
        await TestError.StringFunctionToContainString(
          stringReturnFunc,
          containValue,
          timeoutMs,
        ),
        stringReturnFunc,
      ),
    );
    expect(stringReturnFunc).toHaveBeenCalledTimes(
      timeoutMs / pollIntervalMs + 2,
    );
  });
});
