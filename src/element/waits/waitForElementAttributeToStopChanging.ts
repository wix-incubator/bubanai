import { DocumentContext } from '../../page';
import { waitForValueToStopChanging } from '../../waits';
import { SelectorOrElement } from '../types';
import { AttributeType } from '../../selector';
import { getAttribute } from '../getAttribute';
import { WaitOptions } from '../../types';

export async function waitForElementAttributeToStopChanging(
  context: DocumentContext,
  selectorOrElement: SelectorOrElement,
  attr: AttributeType,
  waitOptions?: WaitOptions,
) {
  return waitForValueToStopChanging(async () => {
    const element =
      typeof selectorOrElement === 'string'
        ? await context.$(selectorOrElement)
        : selectorOrElement;
    const attribute = element && (await getAttribute(attr, context, element));
    return attribute;
  }, waitOptions);
}
