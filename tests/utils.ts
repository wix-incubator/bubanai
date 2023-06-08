import { TestError } from '../src';

export const wrapError = (
  testError: string,
  call: (...args: any) => Promise<any> | any,
) => TestError.Base(testError, call);
