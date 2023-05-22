import { TestError, wait, waitForValuesToBeCloseTo } from '../../src';
import { wrapError } from './waitUtils.testKit';

describe('Waits: waitForValuesToBeCloseTo()', () => {
  it('resolves if function value is close to another value after wait', async () => {
    let result = 4;
    const secondValue = 7.9;
    const delta = 2;
    const actionTimeout = 1000;
    const pollIntervalMs = 500;
    const changeVarFunc = async () => {
      await wait(actionTimeout);
      result += 2;
      return result;
    };
    const numberReturnFunc = jest.fn(() => Promise.resolve(result));
    changeVarFunc();
    await expect(
      waitForValuesToBeCloseTo(numberReturnFunc, secondValue, delta, {
        pollIntervalMs,
      }),
    ).resolves.toBeUndefined();
    expect(numberReturnFunc).toHaveBeenCalledTimes(
      actionTimeout / pollIntervalMs + 1,
    );
  });

  it('rejects if function values are not close to each other within delta after wait', async () => {
    const result = 6.2;
    const closeToValue = 6.35;
    const delta = 0.1;
    const numberReturnFunc = jest.fn(async () => result);
    const timeoutMs = 1000;
    const pollIntervalMs = 500;
    await expect(
      waitForValuesToBeCloseTo(numberReturnFunc, closeToValue, delta, {
        timeoutMs,
        pollIntervalMs,
      }),
    ).rejects.toThrowError(
      wrapError(
        TestError.ValuesToBeCloseTo(
          result,
          closeToValue,
          closeToValue - result,
          delta,
          timeoutMs,
        ),
        numberReturnFunc,
      ),
    );
    expect(numberReturnFunc).toHaveBeenCalledTimes(timeoutMs / pollIntervalMs);
  });
});
