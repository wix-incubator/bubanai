import { TestError, throwTestError } from '../error';
import { waitFor } from '../waitFor';
import { DefaultWaitOptions, WaitOptions } from '../types';

/**
 * Waits for async function numeric value is close to expected value by delta amount. |actual - expected| <= delta
 * If it is not after timeout - throws exception.
 * @param actual Async function with return type: number
 * @param expected Number value that is close to function
 * @param delta Precision
 * @param waitOptions WaitOptions
 *
 * @category Waiters
 */
export function waitForValuesToBeCloseTo(
  actual: () => Promise<number>,
  expected: Promise<number> | number,
  delta: number,
  waitOptions?: WaitOptions,
) {
  let difference = 0;
  let actualNumber = 0;
  let expectedNumber = 0;
  return waitFor(async () => {
    actualNumber = await actual();
    expectedNumber = await expected;
    difference = Math.abs(actualNumber - expectedNumber);
    return difference <= delta;
  }, waitOptions).catch(async () =>
    throwTestError(
      TestError.ValuesToBeCloseTo(
        actualNumber,
        expectedNumber,
        difference,
        delta,
        waitOptions?.timeoutMs ?? DefaultWaitOptions.timeoutMs,
      ),
      actual,
    ),
  );
}
