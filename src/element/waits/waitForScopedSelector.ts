import type { DocumentContext } from '../../page';
import type { ElementHandle } from 'puppeteer-core';
import type { ElementOptions } from '../types';
import { isXpath } from '../types';
import { noop } from 'lodash';
import { TestError } from '../../error';

/**
 * Waits for internal element that is rendered inside initialized ElementHandle instance.
 * Supports xpath selectors.
 * If element doesn't found - throws exception.
 * Historically was created for first versions of Puppeteer which didn't have element.waitForSelector(selector);
 * @param context
 * @param scopeElement
 * @param selector
 * @param options
 *
 * @example `const rootElement = await getElement(context, '#root');` <br>
 * `const internalElement = await waitForScopedSelector(page, rootElement, '#element_1');`
 *
 * @category Element Waits
 */
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
    try {
      const element = await context.waitForFunction(
        (querySelector: string, scope: Element) =>
          scope.querySelector(querySelector),
        options || {},
        selector,
        scopeElement,
      );
      result = element.asElement();
    } catch (e) {
      noop();
    }
  }
  if (result === null) {
    throw new Error(TestError.ElementWithSelectorWasNotFound(selector));
  }
  return result;
}
