import { ElementHandle } from 'puppeteer-core';
import { DocumentContext } from '../page';
import { getElement } from './getElement';
import { SelectorOrElement } from './types';

export async function getParent(
  context: DocumentContext,
  elementOrSelector: SelectorOrElement,
): Promise<ElementHandle> {
  const element = await getElement(context, elementOrSelector);
  return element.$x('..').then((els) => els[0]);
}
