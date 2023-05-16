import { wait, waitForConditionWithoutException } from '../../src';
import { ACTION_SMALL_TIMEOUT } from '../../src/settings';
import { noop } from 'lodash';

describe('Waits: waitForConditionWithoutException()', () => {
  it('resolves if function value is true after wait', async () => {
    let result;
    const pollIntervalMs = 500;
    const changeVarFunc = async () => {
      await wait(ACTION_SMALL_TIMEOUT);
      result = true;
      return result;
    };
    const booleanReturnFunc = jest.fn(() => Promise.resolve(result));
    changeVarFunc();
    await expect(
      waitForConditionWithoutException(booleanReturnFunc, { pollIntervalMs }),
    ).resolves.toBeUndefined();
    expect(booleanReturnFunc).toHaveBeenCalledTimes(
      ACTION_SMALL_TIMEOUT / pollIntervalMs + 1,
    );
  });

  it('resolves if function value is not true after wait', async () => {
    const result = null;
    const booleanReturnFunc = jest.fn(async () => result);
    const timeoutMs = 2000;
    const pollIntervalMs = 500;
    const mockedFn = jest.spyOn(console, 'error').mockImplementation(noop);
    await expect(
      waitForConditionWithoutException(booleanReturnFunc, {
        timeoutMs,
        pollIntervalMs,
      }),
    ).resolves.toBeUndefined();
    expect(mockedFn).toHaveBeenCalledTimes(1);
    mockedFn.mockRestore();
    expect(booleanReturnFunc).toHaveBeenCalledTimes(timeoutMs / pollIntervalMs);
  });
});
