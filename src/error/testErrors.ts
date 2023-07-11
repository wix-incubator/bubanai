import type { StringOrRegExp } from '../types';
import type { SelectorOrElement } from '../element';

export const TestError = {
  Base: (message: string, call: (...args: any) => Promise<any> | any) =>
    `${message} for function: \n ${call.toString()}`,
  WaitFor: (timeoutMs: number) =>
    withTimeout(
      `Wait for condition haven't got true value for function`,
      timeoutMs,
    ),
  CollectionLengthToBe: async (
    expectedLength: number,
    collection: () => Promise<any[]>,
    timeout: number,
  ) =>
    withTimeout(
      `Expected collection length: '${expectedLength}', but was: '${await collection().then(
        (c) => c.length,
      )}'`,
      timeout,
    ),
  CollectionLengthToBeMoreThan: async (
    moreThan: number,
    collection: () => Promise<any[]>,
    timeout: number,
  ) =>
    withTimeout(
      `Expected collection length should be more than: '${moreThan}', but was: '${await collection().then(
        (c) => c.length,
      )}'`,
      timeout,
    ),
  CollectionLengthToBeNotLessThan: async (
    minLength: number,
    collection: () => Promise<any[]>,
    timeout: number,
  ) =>
    withTimeout(
      `Expected collection length should be not less than: '${minLength}', but was: '${await collection().then(
        (c) => c.length,
      )}'`,
      timeout,
    ),
  CollectionNotToHaveItem: async <T>(
    func: () => Promise<T[]>,
    value: T,
    timeout: number,
  ) =>
    withTimeout(
      `Returned array should NOT contain value '${JSON.stringify(
        value,
      )}', but actually it had: '${JSON.stringify(await func())}'`,
      timeout,
    ),
  CollectionIsEmpty: (timeout: number) =>
    withTimeout(`Collection is not empty`, timeout),
  CollectionIsNotEmpty: (timeout: number) =>
    withTimeout(`Collection is left empty`, timeout),
  CollectionToHaveItem: async <T>(
    func: () => Promise<T[]>,
    value: T,
    timeout: number,
  ) =>
    withTimeout(
      `Returned array should contain value '${JSON.stringify(
        value,
      )}', but actually it had not: '${JSON.stringify(await func())}'`,
      timeout,
    ),
  IsFalsy: (timeout: number) =>
    withTimeout(`Condition hasn't got false value`, timeout),
  FunctionValueToBeChanged: async <T>(
    funcValue: T,
    action: () => Promise<any>,
    timeout: number,
  ) =>
    withTimeout(
      `Value expected to change after '${action.toString()}'
    was called and not to equal '${JSON.stringify(
      funcValue,
    )}' but it is still the same`,
      timeout,
    ),
  ObjectsNotToBeEqual: async <T>(
    actual: () => Promise<T>,
    expected: Promise<T> | T,
    timeout: number,
  ) => withTimeout(`Both objects are still equal '${await expected}'`, timeout),
  ObjectsToBeEqual: async <T>(
    actual: () => Promise<T>,
    expected: Promise<T> | T,
    timeout: number,
  ) =>
    withTimeout(
      `Actual result: '${await actual().then((r) =>
        JSON.stringify(r),
      )}' is not equal expected: '${JSON.stringify(expected)}'`,
      timeout,
    ),
  StringFunctionToContainString: async (
    func: () => Promise<string>,
    value: string,
    timeout: number,
  ) =>
    withTimeout(
      `Function value should contain string '${value}', but actually it had not: '${await func()}'`,
      timeout,
    ),
  ValuesToBeCloseTo: (
    actual: number,
    expected: number,
    difference: number,
    delta: number,
    timeout: number,
  ) =>
    withTimeout(
      `Actual result: '${actual}' is different from expected: '${expected}' by '${difference}' that is more than '${delta}'`,
      timeout,
    ),
  ValueIsEqualOrLessThan: async (
    func: () => Promise<number>,
    value: number,
    timeout: number,
  ) =>
    withTimeout(
      `Function value should be less or equal to '${value}', but actually it was: '${await func()}'`,
      timeout,
    ),
  ValueIsEqualOrMoreThan: async (
    func: () => Promise<number>,
    value: number,
    timeout: number,
  ) =>
    withTimeout(
      `Function value should be equal or more than '${value}', but actually it was: '${await func()}'`,
      timeout,
    ),
  ValueIsLessThan: async (
    func: () => Promise<number>,
    value: number,
    timeout: number,
  ) =>
    withTimeout(
      `Function value should be less than '${value}', but actually it was: '${await func()}'`,
      timeout,
    ),
  ValueIsMoreThan: async (
    func: () => Promise<number>,
    value: number,
    timeout: number,
  ) =>
    withTimeout(
      `Function value should be more than '${value}', but actually it was: '${await func()}'`,
      timeout,
    ),
  ValueToStopChanging: <T>(existingValue: T, newValue: T, timeout: number) =>
    withTimeout(
      `Value '${JSON.stringify(existingValue)}' -> '${JSON.stringify(
        newValue,
      )}' did not stop changing`,
      timeout,
    ),
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
    withTimeout(`Frame with url: ${url} was not detached`, timeout),
  FrameWithUrlWasNotFound: (frameUrl: string, timeout: number) =>
    withTimeout(`The frame with URL '${frameUrl}' wasn't found`, timeout),
  FrameWithNameWasNotFound: (name: string, timeout: number) =>
    withTimeout(`The frame with name '${name}' wasn't found`, timeout),
  RegExpWithStrictMatch: () => 'RegExp with strict match are not compatible.',
  ElementWithSelectorWasNotFound: (selector: string) =>
    `Element with selector ${selector} was not found.`,
  ElementIsDisabledOnClick: (selectorOrElement: SelectorOrElement) =>
    `Could not perform a click on an element, the element ${
      typeof selectorOrElement === 'string'
        ? `with selector '${selectorOrElement}' `
        : ''
    }is disabled.`,
  PageArgumentIsNotPassed: () =>
    `The page argument should be passed when the Frame is a context`,
  AttributeWasNotChanged: (
    attribute: string,
    action: () => Promise<any>,
    timeout: number,
  ) =>
    withTimeout(
      `Attribute '${attribute}' value wasn't changed after ${action.toString()}`,
      timeout,
    ),
  ElementIsStillInViewport: (timeout: number) =>
    withTimeout(`Element is still in viewport`, timeout),
  ElementStillHasAttribute: (
    attribute: string,
    value: string,
    timeout: number,
  ) =>
    withTimeout(
      `Element still has attribute '${attribute}': '${value}'`,
      timeout,
    ),
  ElementIsNotChecked: (timeout: number) =>
    withTimeout(`Element is NOT checked`, timeout),
  ElementIsNotExpanded: (timeout: number) =>
    withTimeout(`Element is NOT expanded`, timeout),
  ElementIsNotInViewport: (timeout: number) =>
    withTimeout(`Element is NOT in viewport`, timeout),
  ElementIsLeftDisabled: (timeout: number) =>
    withTimeout(`Element is left disabled`, timeout),
  ElementIsLeftChecked: (timeout: number) =>
    withTimeout(`Element is left checked`, timeout),
  ElementIsNotContainText: (text: string, timeout: number) =>
    withTimeout(`Element doesn't contain text '${text}'`, timeout),
  ElementDoesNotHaveAttribute: (
    attribute: string,
    value: string,
    timeout: number,
  ) =>
    withTimeout(
      `Element doesn't have attribute '${attribute}': '${value}'`,
      timeout,
    ),
  ElementDoesNotHaveAttributePart: (
    attribute: string,
    valuePart: string,
    timeout: number,
  ) =>
    withTimeout(
      `Element doesn't have attribute '${attribute}' with value part '${valuePart}'`,
      timeout,
    ),
  ElementDoesNotHavePropertyPart: (
    property: string,
    valuePart: string,
    timeout: number,
  ) =>
    withTimeout(
      `Element doesn't have property '${property}' with value part '${valuePart}'`,
      timeout,
    ),
  LocalStorageIsDisabled: () => 'Local Storage is disabled!',
};

const withTimeout = (message: string, timeout) =>
  `${message} after ${timeout / 1000} second(s) timeout`;
