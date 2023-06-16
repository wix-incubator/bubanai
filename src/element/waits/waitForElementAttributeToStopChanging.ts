import { DocumentContext } from '../../page';
import { waitForValueToStopChanging } from '../../waits';
import { SelectorOrElement } from '../types';
import { AttributeType } from '../../selector';
import { getAttribute } from '../getAttribute';
import { WaitOptions } from '../../types';
import { elementBySelectorType } from '../utils';

/**
 * Waits for attribute value for element to stop changing.
 * Is useful when your element is in rendering and you want to wait until it would
 * be rendered completely.
 * @param context Page or Frame
 * @param selectorOrElement Selector or element
 * @param attr Attribute name
 * @param waitOptions WaitOptions
 *
 * @example `await waitForElementAttributeToStopChanging(page, [data-hook='side-panel'], AttributeType.STYLE);`
 *
 * @category Element Waits
 */
export async function waitForElementAttributeToStopChanging(
  context: DocumentContext,
  selectorOrElement: SelectorOrElement,
  attr: AttributeType,
  waitOptions?: WaitOptions,
) {
  return waitForValueToStopChanging(async () => {
    const element =
      typeof selectorOrElement === 'string'
        ? await elementBySelectorType(context, selectorOrElement)
        : selectorOrElement;
    const attribute = element && (await getAttribute(attr, context, element));
    return attribute;
  }, waitOptions);
}
