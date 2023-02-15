import { throwTestError } from '../error';
import { waitFor } from '../waitFor';
import { WaitOptions } from '../types';

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
      `Actual result: ${actualNumber} is different from expected: ${expected} by ${difference} that is more than ${delta}`,
      actual,
    ),
  );
}
