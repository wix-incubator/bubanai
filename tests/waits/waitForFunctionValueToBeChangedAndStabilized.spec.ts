import { wait, waitForFunctionValueToBeChangedAndStabilized } from '../../src';

describe('Waits: waitForFunctionValueToBeChangedAndStabilized()', () => {
  it('resolves if function value is changed and stop changing after action', async () => {
    let result = 1;
    const actionTimeout = 1000;
    const pollIntervalMs = 500;
    const targetFunction = jest.fn(async () => result);
    const actionFunction = jest.fn(async () => {
      await wait(actionTimeout);
      result = 2;
    });
    const finalResult = 5;
    setTimeout(() => (result = 4), actionTimeout + 300);
    setTimeout(() => (result = finalResult), actionTimeout + 800);
    await expect(
      waitForFunctionValueToBeChangedAndStabilized(
        targetFunction,
        actionFunction,
        {
          pollIntervalMs,
        },
      ),
    ).resolves.toBeUndefined();
    expect(result).toBe(finalResult);
    // 8 means that 2 times function is called during wait for value to be changed
    // and 6 times during wait for stop changing. (value is changed 2 times, so 3 loop calls, 2*3 + 2 = 8)
    expect(targetFunction).toHaveBeenCalledTimes(8);
    expect(actionFunction).toHaveBeenCalledTimes(1);
  });
});
