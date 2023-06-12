import { TestError, wait, waitForValueToBeLessThan } from '../../src';
import { wrapError } from '../utils';

describe('Waits: waitForValueToBeLessThan()', () => {
  it('resolves if function value less than expected after wait', async () => {
    let result = 0.9;
    const decrement = 0.1;
    const expectedValue = result - decrement + 0.00001;
    const actionTimeout = 1000;
    const pollIntervalMs = 500;
    const changeVarFunc = async () => {
      await wait(actionTimeout);
      result -= decrement;
      return result;
    };
    const numberReturnFunc = jest.fn(() => Promise.resolve(result));
    changeVarFunc();
    await expect(
      waitForValueToBeLessThan(numberReturnFunc, expectedValue, {
        pollIntervalMs,
      }),
    ).resolves.toBeUndefined();
    expect(numberReturnFunc).toHaveBeenCalledTimes(
      actionTimeout / pollIntervalMs + 1,
    );
  });

  it('rejects if function value is equal expected after wait', async () => {
    const result = 0.9;
    const expectedValue = result;
    const numberReturnFunc = jest.fn(async () => result);
    const timeoutMs = 1100;
    const pollIntervalMs = 500;
    await expect(
      waitForValueToBeLessThan(numberReturnFunc, expectedValue, {
        timeoutMs,
        pollIntervalMs,
      }),
    ).rejects.toThrowError(
      wrapError(
        await TestError.ValueIsLessThan(
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
