import { TestError, wait, waitForValueToBeEqualOrMoreThan } from '../../src';
import { wrapError } from '../utils';

describe('Waits: waitForValueToBeEqualOrMoreThan()', () => {
  it('resolves if function value equals expected after wait', async () => {
    let result = 0.89;
    const decrement = 0.01;
    const expectedValue = result + decrement;
    const actionTimeout = 1000;
    const pollIntervalMs = 500;
    const changeVarFunc = async () => {
      await wait(actionTimeout);
      result += decrement;
      return result;
    };
    const numberReturnFunc = jest.fn(() => Promise.resolve(result));
    changeVarFunc();
    await expect(
      waitForValueToBeEqualOrMoreThan(numberReturnFunc, expectedValue, {
        pollIntervalMs,
      }),
    ).resolves.toBeUndefined();
    expect(numberReturnFunc).toHaveBeenCalledTimes(
      actionTimeout / pollIntervalMs + 1,
    );
  });

  it('resolves if function value is more than than expected after wait', async () => {
    let result = 0.89;
    const decrement = 0.1;
    const expectedValue = 0.9;
    const actionTimeout = 1000;
    const pollIntervalMs = 500;
    const changeVarFunc = async () => {
      await wait(actionTimeout);
      result += decrement;
      return result;
    };
    const numberReturnFunc = jest.fn(() => Promise.resolve(result));
    changeVarFunc();
    await expect(
      waitForValueToBeEqualOrMoreThan(numberReturnFunc, expectedValue, {
        pollIntervalMs,
      }),
    ).resolves.toBeUndefined();
    expect(numberReturnFunc).toHaveBeenCalledTimes(
      actionTimeout / pollIntervalMs + 1,
    );
  });

  it('rejects if function value is more than expected after wait', async () => {
    const result = 0.9;
    const expectedValue = result + 0.00001;
    const numberReturnFunc = jest.fn(async () => result);
    const timeoutMs = 1100;
    const pollIntervalMs = 500;
    await expect(
      waitForValueToBeEqualOrMoreThan(numberReturnFunc, expectedValue, {
        timeoutMs,
        pollIntervalMs,
      }),
    ).rejects.toThrow(
      wrapError(
        await TestError.ValueIsEqualOrMoreThan(
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
