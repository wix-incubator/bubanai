import type { ActionReturnType } from '../../src';
import { TestError, wait, waitForConditionToBeFalsy } from '../../src';
import { wrapError } from '../utils';

describe('Waits: waitForConditionToBeFalsy()', () => {
  it('resolves if function value is falsy after wait', async () => {
    let result: ActionReturnType = true;
    const actionTimeout = 2000;
    const pollIntervalMs = 500;
    const changeVarFunc = async () => {
      await wait(actionTimeout);
      result = undefined;
      return result;
    };
    const booleanReturnFunc = jest.fn(() => Promise.resolve(result));
    changeVarFunc();
    await expect(
      waitForConditionToBeFalsy(booleanReturnFunc, {
        pollIntervalMs,
      }),
    ).resolves.toBeUndefined();
    expect(booleanReturnFunc).toHaveBeenCalledTimes(
      actionTimeout / pollIntervalMs + 1,
    );
  });

  it('rejects if function value is true after wait', async () => {
    const result = true;
    const booleanReturnFunc = jest.fn(async () => result);
    const timeoutMs = 2000;
    const pollIntervalMs = 500;
    await expect(
      waitForConditionToBeFalsy(booleanReturnFunc, {
        timeoutMs,
        pollIntervalMs,
      }),
    ).rejects.toThrowError(
      wrapError(TestError.IsFalsy(timeoutMs), booleanReturnFunc),
    );
    expect(booleanReturnFunc).toHaveBeenCalledTimes(timeoutMs / pollIntervalMs);
  });

  it('resolves simultaneously if function return value is falsy', async () => {
    const result = false;
    const booleanReturnFunc = jest.fn(async () => result);
    await expect(
      waitForConditionToBeFalsy(booleanReturnFunc),
    ).resolves.toBeUndefined();
    expect(booleanReturnFunc).toHaveBeenCalledTimes(1);
  });

  it('should throw custom error message on reject', async () => {
    const result = true;
    const booleanReturnFunc = jest.fn(async () => result);
    const timeoutMs = 500;
    const pollIntervalMs = 500;
    const errorMessage = 'Custom error message';
    await expect(
      waitForConditionToBeFalsy(
        booleanReturnFunc,
        {
          timeoutMs,
          pollIntervalMs,
        },
        errorMessage,
      ),
    ).rejects.toThrowError(
      `${errorMessage} for function: \n ${booleanReturnFunc.toString()}`,
    );
  });
});
