import { StringOrRegExp } from '../types';

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
  StringFunctionToContainString: async (
    func: () => Promise<string>,
    value: string,
    timeout: number,
  ) =>
    `Function value should contain string '${value}', but actually it had not: '${await func()}' after ${
      timeout / 1000
    } second(s) timeout`,
  ValuesToBeCloseTo: (
    actual: number,
    expected: number,
    difference: number,
    delta: number,
    timeout: number,
  ) =>
    `Actual result: '${actual}' is different from expected: '${expected}' by '${difference}' that is more than '${delta}' after ${
      timeout / 1000
    } second(s) timeout`,
  ValueIsEqualOrLessThan: async (
    func: () => Promise<number>,
    value: number,
    timeout: number,
  ) =>
    `Function value should be less or equal to '${value}', but actually it was: '${await func()}' after ${
      timeout / 1000
    } second(s) timeout'`,
  ValueIsEqualOrMoreThan: async (
    func: () => Promise<number>,
    value: number,
    timeout: number,
  ) =>
    `Function value should be equal or more than '${value}', but actually it was: '${await func()}' after ${
      timeout / 1000
    } second(s) timeout'`,
  ValueIsLessThan: async (
    func: () => Promise<number>,
    value: number,
    timeout: number,
  ) =>
    `Function value should be less than '${value}', but actually it was: '${await func()}' after ${
      timeout / 1000
    } second(s) timeout'`,
  ValueIsMoreThan: async (
    func: () => Promise<number>,
    value: number,
    timeout: number,
  ) =>
    `Function value should be more than '${value}', but actually it was: '${await func()}' after ${
      timeout / 1000
    } second(s) timeout'`,
  ValueToStopChanging: <T>(existingValue: T, newValue: T, timeout: number) =>
    `Value '${JSON.stringify(existingValue)}' -> '${JSON.stringify(
      newValue,
    )}' did not stop changing after ${timeout / 1000} second(s) timeout`,
  WithAttempts: (attempts: number, interval: number) =>
    `Failed to receive true value after ${attempts} attempts with interval ${interval} milliseconds`,
  BoundingBox: () => 'Failed to get bounding box!',
  BoundingIsNotPlacedInside: async (
    boundingGetter: () => Promise<any>,
    parentBounding: any,
  ) =>
    `Bounding ${JSON.stringify(
      await boundingGetter(),
    )} is not placed inside ${JSON.stringify(parentBounding)}`,
  TabIsNotFound: (partialUrlOrUrlPattern: StringOrRegExp) =>
    `Could not find tab with url: ${partialUrlOrUrlPattern}`,
  FailedToInitializePage: (partialUrlOrUrlPattern: StringOrRegExp) =>
    `Failed to initialize Page instance for tab with url: ${partialUrlOrUrlPattern}`,
  ExactTextIsNotFoundInArray: (text: string) =>
    `Element containing ${text} text was not found in array.`,
  ContainedTextIsNotFoundInArray: (text: string) =>
    `Element containing ${text} text was not found in array.`,
  FormatIsNotImplemented: (formatType: string) =>
    `'${formatType}' format is not implemented.`,
  OptionIsNotFound: (option: string | number) =>
    `Option or index: '${option}' is not found in dropdown.`,
  FrameWasNotDetached: (url: string, timeout: number) =>
    `Frame with url: ${url} was not detached after ${
      timeout / 1000
    } second(s) timeout.`,
  FrameWithUrlWasNotFound: (frameUrl: string, timeout: number) =>
    `The frame with URL '${frameUrl}' wasn't found after ${
      timeout / 1000
    } second(s) timeout.`,
  FrameWithNameWasNotFound: (name: string, timeout: number) =>
    `The frame with name '${name}' wasn't found after ${
      timeout / 1000
    } second(s) timeout.`,
  RegExpWithStrictMatch: () => 'RegExp with strict match are not compatible.',
  ElementWithSelectorWasNotFound: (selector: string) =>
    `Element with selector ${selector} was not found`,
};
