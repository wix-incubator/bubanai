import type { DocumentContext } from '../../page';
import type { ElementHandle } from 'puppeteer-core';
import type { AttributeType } from '../../selector';
import { getAttribute } from '../props/getAttribute';
import { filterAsync } from '../../collection';
import { getElements } from '../general/getElements';
import type { SelectorOrElements } from '../types';

/**
 * Returns filtered array of elements that contain defined attribute value part.
 * @param context Page or Frame
 * @param elements Element or selector
 * @param attributeType Attribute name
 * @param attrValue Attribute value part
 *
 * @category Element Actions
 */
export async function filterElementsByContainAttribute(
  context: DocumentContext,
  elements: SelectorOrElements,
  attributeType: AttributeType,
  attrValue: string,
) {
  const targetElements = await getElements(context, elements);
  const filterFunc = async (element: ElementHandle) =>
    getAttribute(attributeType, context, element).then((attr) =>
      attr !== null ? attr.indexOf(attrValue) !== -1 : false,
    );
  return filterAsync(targetElements, filterFunc);
}
