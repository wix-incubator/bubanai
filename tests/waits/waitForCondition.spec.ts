import { wait, waitForCondition } from '../../src';

describe('Waits: waitForCondition()', () => {
  it('resolves if collection has item after wait', async () => {
    let result;
    const actionTimeout = 2000;
    const pollIntervalMs = 500;
    const changeVarFunc = async () => {
      await wait(actionTimeout);
      result = true;
      return result;
    };
    const booleanReturnFunc = jest.fn(() => Promise.resolve(result));
    changeVarFunc();
    await expect(
      waitForCondition(booleanReturnFunc, {
        pollIntervalMs,
      }),
    ).resolves.toBeUndefined();
    expect(booleanReturnFunc).toHaveBeenCalledTimes(
      actionTimeout / pollIntervalMs + 1,
    );
  });

  it('rejects if function value is not true after wait', async () => {
    const result = null;
    const booleanReturnFunc = jest.fn(async () => result);
    const timeoutMs = 2000;
    const pollIntervalMs = 500;
    await expect(
      waitForCondition(booleanReturnFunc, {
        timeoutMs,
        pollIntervalMs,
      }),
    ).rejects.toThrowError(
      `Wait for condition haven't got true value for function after ${
        timeoutMs / 1000
      } seconds timeout for function: \n ${booleanReturnFunc.toString()}`,
    );
    expect(booleanReturnFunc).toHaveBeenCalledTimes(timeoutMs / pollIntervalMs);
  });

  it('resolves simultaneously if function return value is true', async () => {
    const result = true;
    const booleanReturnFunc = jest.fn(async () => result);
    await expect(waitForCondition(booleanReturnFunc)).resolves.toBeUndefined();
    expect(booleanReturnFunc).toHaveBeenCalledTimes(1);
  });

  it('should throw custom error message on reject', async () => {
    const result = false;
    const booleanReturnFunc = jest.fn(async () => result);
    const timeoutMs = 500;
    const pollIntervalMs = 500;
    const errorMessage = 'Custom error message';
    await expect(
      waitForCondition(
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

  it('should throw error message with custom callee', async () => {
    const result = false;
    const booleanReturnFunc = jest.fn(async () => result);
    const timeoutMs = 500;
    const pollIntervalMs = 500;
    const callee = async () =>
      Promise.resolve(() => console.log([])).then(() => 4);
    await expect(
      waitForCondition(
        booleanReturnFunc,
        {
          timeoutMs,
          pollIntervalMs,
        },
        undefined,
        callee,
      ),
    ).rejects.toThrowError(
      `Wait for condition haven't got true value for function after ${
        timeoutMs / 1000
      } seconds timeout for function: \n ${callee.toString()}`,
    );
  });
});
