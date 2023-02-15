import { DocumentContext } from '../../page';
import { ElementHandle } from 'puppeteer-core';
import { ElementOptions, isXpath } from '../types';

export async function waitForScopedSelector(
  context: DocumentContext,
  scopeElement: ElementHandle,
  selector: string,
  options?: ElementOptions,
): Promise<ElementHandle> {
  let result;
  if (isXpath(selector)) {
    if (scopeElement.waitForXPath) {
      result = await scopeElement.waitForXPath(selector, options);
    } else {
      result = (await scopeElement.$x(selector))[0];
    }
  } else if (scopeElement.waitForSelector) {
    result = await scopeElement.waitForSelector(selector, options);
  } else {
    result = await scopeElement.$(selector);
  }
  if (result === null) {
    throw new Error(`Scoped selector ${selector} was not found.`);
  }
  return result;
}
