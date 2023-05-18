export const TestError = {
  Base: (message: string, call: (...args: any) => Promise<any> | any) =>
    `${message} for function: \n ${call.toString()}`,
  WaitFor: (timeoutMs: number) =>
    `Wait for condition haven't got true value for function after ${
      timeoutMs / 1000
    } second(s) timeout`,
  CollectionLengthToBe: async (
    expectedLength: number,
    collection: () => Promise<any[]>,
    timeout: number,
  ) =>
    `Expected collection length: '${expectedLength}', but was: '${await collection().then(
      (c) => c.length,
    )}' after ${timeout / 1000} second(s) timeout`,
  CollectionLengthToBeMoreThan: async (
    moreThan: number,
    collection: () => Promise<any[]>,
    timeout: number,
  ) =>
    `Expected collection length should be more than: '${moreThan}', but was: '${await collection().then(
      (c) => c.length,
    )}' after ${timeout / 1000} second(s) timeout`,
  CollectionLengthToBeNotLessThan: async (
    minLength: number,
    collection: () => Promise<any[]>,
    timeout: number,
  ) =>
    `Expected collection length should be not less than: '${minLength}', but was: '${await collection().then(
      (c) => c.length,
    )}' after ${timeout / 1000} second(s) timeout`,
  CollectionNotToHaveItem: async <T>(
    func: () => Promise<T[]>,
    value: T,
    timeout: number,
  ) =>
    `Returned array should NOT contain value '${JSON.stringify(
      value,
    )}', but actually it had: '${JSON.stringify(await func())}' after ${
      timeout / 1000
    } second(s) timeout`,
  CollectionIsEmpty: (timeout: number) =>
    `Collection is not empty after ${timeout / 1000} second(s) timeout`,
  CollectionIsNotEmpty: (timeout: number) =>
    `Collection is left empty after ${timeout / 1000} second(s) timeout`,
  CollectionToHaveItem: async <T>(
    func: () => Promise<T[]>,
    value: T,
    timeout: number,
  ) =>
    `Returned array should contain value '${JSON.stringify(
      value,
    )}', but actually it had not: '${JSON.stringify(await func())}' after ${
      timeout / 1000
    } second(s) timeout`,
  IsFalsy: (timeout: number) =>
    `Condition hasn't got false value after ${
      timeout / 1000
    } second(s) timeout`,
  FunctionValueToBeChanged: async <T>(
    funcValue: T,
    action: () => Promise<any>,
    timeout: number,
  ) => `Value expected to change after '${action.toString()}'
    was called and not to equal '${JSON.stringify(
      funcValue,
    )}' but it is still the same after ${timeout / 1000} second(s) timeout`,
  ObjectsNotToBeEqual: async <T>(
    actual: () => Promise<T>,
    expected: Promise<T> | T,
    timeout: number,
  ) =>
    `Both objects are still equal '${await expected}' after ${
      timeout / 1000
    } second(s) timeout`,
  ObjectsToBeEqual: async <T>(
    actual: () => Promise<T>,
    expected: Promise<T> | T,
    timeout: number,
  ) =>
    `Actual result: '${await actual().then((r) =>
      JSON.stringify(r),
    )}' is not equal expected: '${JSON.stringify(expected)}' after ${
      timeout / 1000
    } second(s) timeout`,
};
