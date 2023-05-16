import { ActionReturnType, wait, waitForConditionToBeFalsy } from '../../src';

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
      `Condition doesn't get false value after ${
        timeoutMs / 1000
      } seconds timeout for function: \n ${booleanReturnFunc.toString()}`,
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
