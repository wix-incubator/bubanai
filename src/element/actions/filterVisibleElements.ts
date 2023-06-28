import { getAttribute } from '../props/getAttribute';
import { AttributeType } from '../../selector';
import type { ElementHandle } from 'puppeteer-core';
import type { DocumentContext } from '../../page';
import { filterAsync } from '../../collection';
import type { SelectorOrElements } from '../types';
import { getElements } from '../general/getElements';

/**
 * Returns filtered array of elements that are in viewport and not hidden.
 * @param context Page or Frame
 * @param elements Element or selector
 *
 * @category Element Actions
 */
export async function filterVisibleElements(
  elements: SelectorOrElements,
  context: DocumentContext,
) {
  const targetElements = await getElements(context, elements);
  const filter = async (element: ElementHandle) => {
    const styleAttribute = await getAttribute(
      AttributeType.STYLE,
      context,
      element,
    ).catch(console.error);
    const hasInvisibleAttribute = styleAttribute
      ? styleAttribute.indexOf('visibility: hidden') !== -1 ||
        styleAttribute.indexOf('visibility:hidden') !== -1
      : false;
    return (await element.isIntersectingViewport()) && !hasInvisibleAttribute;
  };
  return filterAsync(targetElements, filter);
}
