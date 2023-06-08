import { TestError, waitForValueToStopChanging } from '../../src';
import { wrapError } from '../utils';

describe('Waits: waitForValueToStopChanging()', () => {
  it('resolves if function value is stopped changing within timeout', async () => {
    let result = 1;
    const pollIntervalMs = 500;
    const startChangingTime = 300;
    const targetFunction = jest.fn(async () => result);
    setTimeout(() => result++, startChangingTime);
    setTimeout(() => result++, startChangingTime + pollIntervalMs);
    setTimeout(() => result++, startChangingTime + pollIntervalMs * 2);
    await expect(
      waitForValueToStopChanging(targetFunction, {
        pollIntervalMs,
      }),
    ).resolves.toBeUndefined();
    expect(result).toBe(4);
    // 6 times during waits + 2 times on file check
    expect(targetFunction).toHaveBeenCalledTimes(8);
  });

  it('rejects if function value did not stopped changing within timeout', async () => {
    const result: any = {};
    const pollIntervalMs = 500;
    const timeoutMs = 1000;
    const startChangingTime = 300;
    const targetFunction = jest.fn(async () => ({ ...result }));
    setTimeout(() => (result.a = 1), startChangingTime);
    setTimeout(() => (result.b = 2), startChangingTime + pollIntervalMs);
    await expect(
      waitForValueToStopChanging(targetFunction, {
        pollIntervalMs,
        timeoutMs,
      }),
    ).rejects.toThrowError(
      wrapError(
        TestError.ValueToStopChanging({ a: 1 }, { a: 1, b: 2 }, timeoutMs),
        targetFunction,
      ),
    );
    expect(targetFunction).toHaveBeenCalledTimes(4);
  });
});
