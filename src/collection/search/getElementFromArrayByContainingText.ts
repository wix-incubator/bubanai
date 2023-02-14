import { ElementHandle } from 'puppeteer-core';
import { DocumentContext } from '../../page';
import { getElementIndexByContainingText } from './getElementIndexByContainingText';
import { getElements } from '../../element';
import type { SelectorOrElements } from '../../element';

export async function getElementFromArrayByContainingText(
  context: DocumentContext,
  elements: SelectorOrElements,
  text: string,
  ignoreCase = false,
): Promise<ElementHandle> {
  const targetElements = await getElements(context, elements);
  const index = await getElementIndexByContainingText(
    context,
    targetElements,
    text,
    ignoreCase,
  );
  if (index !== -1) {
    return targetElements[index];
  }
  throw new Error(`Element containing ${text} text was not found in array`);
}
