import { ElementHandle } from 'puppeteer-core';
import { DocumentContext } from '../../page';
import { AttributeType } from '../../selector';
import { getAttribute } from '../getAttribute';
import { filterAsync } from '../../collection';
import { SelectorOrElements } from '../types';
import { getElements } from '../getElements';

/**
 * Returns filtered array of elements that exact matches defined attribute value.
 * @param context Page or Frame
 * @param elements Element or selector
 * @param attributeType Attribute name
 * @param attrValue Attribute value
 *
 * @category Element Actions
 */
export async function filterElementsByExactAttribute(
  context: DocumentContext,
  elements: SelectorOrElements,
  attributeType: AttributeType,
  attrValue: string,
) {
  const targetElements = await getElements(context, elements);
  const filterFunc = async (element: ElementHandle) =>
    (await getAttribute(attributeType, context, element)) === attrValue;
  return filterAsync(targetElements, filterFunc);
}
