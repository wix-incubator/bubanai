import { TestError, wait, waitForValueToBeMoreThan } from '../../src';
import { wrapError } from '../utils';

describe('Waits: waitForValueToBeMoreThan()', () => {
  it('resolves if function value is more than expected after wait', async () => {
    let result = 0.89;
    const decrement = 0.01;
    const expectedValue = result + decrement;
    const actionTimeout = 1000;
    const pollIntervalMs = 500;
    const changeVarFunc = async () => {
      await wait(actionTimeout);
      result += decrement + 0.0001;
      return result;
    };
    const numberReturnFunc = jest.fn(() => Promise.resolve(result));
    changeVarFunc();
    await expect(
      waitForValueToBeMoreThan(numberReturnFunc, expectedValue, {
        pollIntervalMs,
      }),
    ).resolves.toBeUndefined();
    expect(numberReturnFunc).toHaveBeenCalledTimes(
      actionTimeout / pollIntervalMs + 1,
    );
  });

  it('rejects if function value is not more than expected after wait', async () => {
    const result = 0.9;
    const expectedValue = result;
    const numberReturnFunc = jest.fn(async () => result);
    const timeoutMs = 1100;
    const pollIntervalMs = 500;
    await expect(
      waitForValueToBeMoreThan(numberReturnFunc, expectedValue, {
        timeoutMs,
        pollIntervalMs,
      }),
    ).rejects.toThrowError(
      wrapError(
        await TestError.ValueIsMoreThan(
          numberReturnFunc,
          expectedValue,
          timeoutMs,
        ),
        numberReturnFunc,
      ),
    );
    expect(numberReturnFunc).toHaveBeenCalledTimes(
      Math.floor(timeoutMs / pollIntervalMs) + 3,
    );
  });
});
