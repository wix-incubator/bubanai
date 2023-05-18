import { TestError, wait, waitForFunctionValueToBeChanged } from '../../src';
import { wrapError } from './waitUtils.testKit';

describe('Waits: waitForFunctionValueToBeChanged()', () => {
  it('resolves if function value is changed after action', async () => {
    let result = 1;
    const actionTimeout = 1000;
    const pollIntervalMs = 500;
    const targetFunction = jest.fn(async () => result);
    const actionFunction = jest.fn(async () => {
      await wait(actionTimeout);
      result = 2;
    });
    await expect(
      waitForFunctionValueToBeChanged(targetFunction, actionFunction, {
        pollIntervalMs,
      }),
    ).resolves.toBeUndefined();
    expect(targetFunction).toHaveBeenCalledTimes(2);
    expect(actionFunction).toHaveBeenCalledTimes(1);
  });

  it('rejects if function value is not changed after action with wait', async () => {
    const result = false;
    const targetFunction = jest.fn(async () => result);
    const timeoutMs = 1000;
    const pollIntervalMs = 500;
    const actionFunction = async () => {
      await wait(timeoutMs);
      return result;
    };
    await expect(
      waitForFunctionValueToBeChanged(targetFunction, actionFunction, {
        timeoutMs,
        pollIntervalMs,
      }),
    ).rejects.toThrowError(
      wrapError(
        await TestError.FunctionValueToBeChanged(
          result,
          actionFunction,
          timeoutMs,
        ),
        targetFunction,
      ),
    );
    expect(targetFunction).toHaveBeenCalledTimes(
      timeoutMs / pollIntervalMs + 1,
    );
  });
});