import { TestError, wait, waitForValueToBeEqualOrLessThan } from '../../src';
import { wrapError } from '../utils';

describe('Waits: waitForValueToBeEqualOrLessThan()', () => {
  it('resolves if function value equals expected after wait', async () => {
    let result = 0.9;
    const decrement = 0.1;
    const expectedValue = result - decrement;
    const actionTimeout = 900;
    const pollIntervalMs = 500;
    const changeVarFunc = async () => {
      await wait(actionTimeout);
      result -= decrement;
      return result;
    };
    const numberReturnFunc = jest.fn(() => Promise.resolve(result));
    changeVarFunc();
    await expect(
      waitForValueToBeEqualOrLessThan(numberReturnFunc, expectedValue, {
        pollIntervalMs,
      }),
    ).resolves.toBeUndefined();
    expect(numberReturnFunc).toHaveBeenCalledTimes(
      Math.round(actionTimeout / pollIntervalMs) + 1,
    );
  });

  it('resolves if function value is less than expected after wait', async () => {
    let result = 0.9;
    const decrement = 0.1;
    const expectedValue = 0.89;
    const actionTimeout = 900;
    const pollIntervalMs = 500;
    const changeVarFunc = async () => {
      await wait(actionTimeout);
      result -= decrement;
      return result;
    };
    const numberReturnFunc = jest.fn(() => Promise.resolve(result));
    changeVarFunc();
    await expect(
      waitForValueToBeEqualOrLessThan(numberReturnFunc, expectedValue, {
        pollIntervalMs,
      }),
    ).resolves.toBeUndefined();
    expect(numberReturnFunc).toHaveBeenCalledTimes(
      Math.round(actionTimeout / pollIntervalMs) + 1,
    );
  });

  it('rejects if function value is more than expected after wait', async () => {
    const result = 0.9;
    const expectedValue = result - 0.00001;
    const numberReturnFunc = jest.fn(async () => result);
    const timeoutMs = 1100;
    const pollIntervalMs = 500;
    await expect(
      waitForValueToBeEqualOrLessThan(numberReturnFunc, expectedValue, {
        timeoutMs,
        pollIntervalMs,
      }),
    ).rejects.toThrow(
      wrapError(
        await TestError.ValueIsEqualOrLessThan(
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
