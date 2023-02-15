// import type { BoundingBox, ElementHandle, Frame } from '@wix/sled-test-runner';
//
// import {
//   waitForTimeout,
//   waitForValueToStopChanging,
//   waitForCondition,
//   throwTestError,
//   waitForConditionWithoutException,
//   waitForSelector,
// } from '@wix/responsive-editor-e2e-testkit';
//
// import { isEqualAsync } from './assertUtils';
// import { isPlacedInside } from './boundingBox';
// import type { ElementOptions } from './elementUtils';
// import {
//   getAttribute,
//   getText,
//   isChecked,
//   isDisabled,
//   isExpanded,
// } from './elementUtils';
// import type { DocumentContext } from './pageUtils';
// import { AttributeType } from './selectorsUtils';
// import { ACTION_INTERVAL, ACTION_TIMEOUT } from '../timeouts';
//
// export {
//   waitForValueToStopChanging,
//   waitForCondition,
//   waitForConditionWithoutException,
//   waitForSelector,
// };
//
// export async function waitForElementAttributeToStopChanging(
//   context: DocumentContext,
//   selectorOrElement: string | ElementHandle,
//   attr: AttributeType,
// ) {
//   return waitForValueToStopChanging(async () => {
//     const element =
//       typeof selectorOrElement === 'string'
//         ? await context.$(selectorOrElement)
//         : selectorOrElement;
//     const attribute = element && (await getAttribute(context, element, attr));
//     return attribute;
//   });
// }
//
//
// export async function waitForFunctionToBeUndefined<T>(func: () => Promise<T>) {
//   return waitForObjectsToBeEqual(() => func(), undefined, func);
// }
//
// export function waitForFunctionNotToBeUndefined<T>(func: () => Promise<T>) {
//   return waitForObjectsNotToBeEqual(() => func(), undefined, func);
// }
//
// export async function waitForFunctionToBeNull<T>(func: () => Promise<T>) {
//   return waitForObjectsToBeEqual(() => func(), null, func);
// }
//
// export async function waitForFunctionValueToBeChangedAndStabilized<T>(
//   func: () => Promise<T>,
//   action: () => Promise<any>,
// ) {
//   await waitForFunctionValueToBeChanged(func, action);
//   await waitForValueToStopChanging(func);
// }
//
// export function waitForElementToBeNotDisabled(
//   context: DocumentContext,
//   elementHandle: ElementHandle,
// ) {
//   return waitForCondition(
//     async () => !(await isDisabled(context, elementHandle)),
//     ACTION_TIMEOUT,
//     'Element is left disabled after timeout.',
//   );
// }
//
//
//
// export function waitForCollectionToBeNotEmpty(
//   collection: () => Promise<any[]>,
// ) {
//   return waitForCondition(
//     async () => (await collection()).length > 0,
//     ACTION_TIMEOUT,
//     'Collection is left empty after timeout.',
//     collection,
//   );
// }
//
// export function waitForBoundingToBePlacedInside(
//   boundingGetter: () => Promise<BoundingBox>,
//   parentBounding: BoundingBox,
// ) {
//   return waitForCondition(() =>
//     boundingGetter().then(b => isPlacedInside(parentBounding, b)),
//   ).catch(async () =>
//     throwTestError(
//       `Bounding ${JSON.stringify(
//         await boundingGetter(),
//       )} is not placed inside ${JSON.stringify(parentBounding)}`,
//       boundingGetter,
//     ),
//   );
// }
//
// export async function waitForValueToBeEqualOrLessThan(
//   func: () => Promise<number>,
//   value: number,
// ) {
//   return waitForCondition(() => func().then(v => v <= value)).catch(async () =>
//     throwTestError(
//       `Function value should be less or equal to ${value}, but actually it was: ${await func()}`,
//       func,
//     ),
//   );
// }
//
// export async function waitForValueToBeLessThan(
//   func: () => Promise<number>,
//   value: number,
// ) {
//   return waitForCondition(() => func().then(v => v < value)).catch(async () =>
//     throwTestError(
//       `Function value should be less than ${value}, but actually it was: ${await func()}`,
//       func,
//     ),
//   );
// }
//
// export async function waitForValueToBeMoreThan(
//   func: () => Promise<number>,
//   value: number,
// ) {
//   return waitForCondition(() => func().then(v => v > value)).catch(async () =>
//     throwTestError(
//       `Function value should be more than ${value}, but actually it was: ${await func()}`,
//       func,
//     ),
//   );
// }
//
// export async function waitForValueToBeEqualOrMoreThan(
//   func: () => Promise<number>,
//   value: number,
// ) {
//   return waitForCondition(() => func().then(v => v >= value)).catch(async () =>
//     throwTestError(
//       `Function value should be equal or more than ${value}, but actually it was: ${await func()}`,
//       func,
//     ),
//   );
// }
//
// export async function waitForStringFunctionToContainString(
//   func: () => Promise<string>,
//   value: string,
// ) {
//   return waitForCondition(() => func().then(str => str.includes(value))).catch(
//     async () =>
//       throwTestError(
//         `Function value should contain string ${value}, but actually it had not: ${await func()}`,
//         func,
//       ),
//   );
// }
//
//
//
//
//
// export function waitForCollectionToBeEmpty(collection: () => Promise<any[]>) {
//   return waitForCondition(
//     async () => (await collection()).length === 0,
//     ACTION_TIMEOUT,
//     'Collection is not empty after timeout.',
//     collection,
//   );
// }
//
// export function waitForElementToHaveAttribute(
//   context: DocumentContext,
//   element: ElementHandle,
//   attribute: AttributeType,
//   value: string,
// ) {
//   return waitForCondition(
//     async () => {
//       const currentAttribute = await getAttribute(context, element, attribute);
//       return currentAttribute.toString() === value;
//     },
//     ACTION_TIMEOUT,
//     `Element doesn't have attribute ${attribute}: ${value} after timeout`,
//   );
// }
//
// export function waitForElementNotToHaveAttribute(
//   context: DocumentContext,
//   element: ElementHandle,
//   attribute: AttributeType,
//   value: string = '',
// ) {
//   return waitForCondition(
//     async () => {
//       const currentAttribute = await getAttribute(
//         context,
//         element,
//         attribute,
//       ).catch(e => console.warn(e));
//       if (!currentAttribute) {
//         return true;
//       }
//       return currentAttribute.toString() !== value;
//     },
//     ACTION_TIMEOUT,
//     `Element is still have attribute ${attribute}: ${value} after timeout`,
//   );
// }
//
// export function waitForElementToBeChecked(
//   context: DocumentContext,
//   element: ElementHandle,
// ) {
//   return waitForCondition(
//     async () => {
//       const checked = await isChecked(context, element);
//       return checked;
//     },
//     ACTION_TIMEOUT,
//     "Element wasn't checked after timeout.",
//   );
// }
//
// export function waitForElementToBeExpanded(
//   context: DocumentContext,
//   element: ElementHandle,
// ) {
//   return waitForCondition(
//     async () => {
//       const expanded = await isExpanded(context, element);
//       return expanded;
//     },
//     ACTION_TIMEOUT,
//     "Element wasn't expanded after timeout.",
//   );
// }
//
// export function waitForElementToBeUnChecked(
//   context: DocumentContext,
//   element: ElementHandle,
// ) {
//   return waitForConditionToBeFalsy(() => isChecked(context, element));
// }
//
// export function waitForElementToHaveAttributePart(
//   context: DocumentContext,
//   element: ElementHandle,
//   attribute: AttributeType,
//   valuePart: string,
// ) {
//   return waitForCondition(
//     async () => {
//       const currentAttribute = await getAttribute(context, element, attribute);
//       return currentAttribute.toString().indexOf(valuePart) !== -1;
//     },
//     ACTION_TIMEOUT,
//     `Element doesn't have attribute ${attribute} with part ${valuePart} after timeout`,
//   );
// }
//
// export function waitForElementToContainClass(
//   context: DocumentContext,
//   element: ElementHandle,
//   valuePart: string,
// ) {
//   return waitForElementToHaveAttributePart(
//     context,
//     element,
//     AttributeType.CLASS,
//     valuePart,
//   );
// }
//
// export async function waitForAttributeToBeChanged(
//   context: DocumentContext,
//   element: ElementHandle,
//   attribute: AttributeType,
//   action: () => Promise<any>,
// ) {
//   const defaultAttribute = await getAttribute(context, element, attribute);
//   await action();
//   await waitForCondition(
//     async () =>
//       defaultAttribute !== (await getAttribute(context, element, attribute)),
//     ACTION_TIMEOUT,
//     `Attribute ${attribute} value wasn't changed after ${action.toString()}.`,
//   );
// }
//
// export async function waitForElementToHaveText(
//   context: DocumentContext,
//   element: ElementHandle,
//   text: string,
// ) {
//   return waitForObjectsToBeEqual(() => getText(context, element), text);
// }
//
// export async function waitForElementToContainText(
//   context: DocumentContext,
//   element: ElementHandle,
//   text: string,
// ) {
//   return waitForCondition(
//     () =>
//       getText(context, element).then(
//         elementText => elementText.indexOf(text) !== -1,
//       ),
//     ACTION_TIMEOUT,
//     `Element doesn't contain text ${text} after timeout.`,
//   );
// }
//
// export async function waitForScopedSelector(
//   page: DocumentContext,
//   scopeElement: ElementHandle,
//   selector: string,
//   options?: ElementOptions,
// ): Promise<ElementHandle> {
//   let result;
//   if (isXpath(selector)) {
//     if (scopeElement.waitForXPath) {
//       result = await scopeElement.waitForXPath(selector, options);
//     } else {
//       result = (await scopeElement.$x(selector))[0];
//     }
//   } else if (scopeElement.waitForSelector) {
//     result = await scopeElement.waitForSelector(selector, options);
//   } else {
//     result = await scopeElement.$(selector);
//   }
//   if (result === null) {
//     throw new Error(`Scoped selector ${selector} was not found.`);
//   }
//   return result;
// }
//
// function isXpath(selector: string) {
//   const xpathValidation = new RegExp('^[.]*//[*a-z]+[\\[].*[\\]].*');
//   return selector.match(xpathValidation);
// }
