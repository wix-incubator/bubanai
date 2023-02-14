import { DocumentContext } from '../../page';
import { ElementHandle } from 'puppeteer-core';
import { AttributeType } from '../../selector';
import { getAttribute } from '../getAttribute';
import { filterAsync } from '../../collection';
import { getElements } from '../getElements';
import { SelectorOrElements } from '../types';

export async function filterElementsByContainAttribute(
  context: DocumentContext,
  elements: SelectorOrElements,
  attributeType: AttributeType,
  attrValue: string,
) {
  const targetElements = await getElements(context, elements);
  const filterFunc = async (element: ElementHandle) =>
    (await getAttribute(attributeType, context, element)).indexOf(attrValue) !==
    -1;
  return filterAsync(targetElements, filterFunc);
}
