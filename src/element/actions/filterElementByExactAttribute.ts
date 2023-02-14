import { ElementHandle } from 'puppeteer-core';
import { DocumentContext } from '../../page';
import { AttributeType } from '../../selector';
import { getAttribute } from '../getAttribute';
import { filterAsync } from '../../collection';
import { SelectorOrElements } from '../types';
import { getElements } from '../getElements';

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
