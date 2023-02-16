import type { SelectorOrElements } from '../../element';
import { DocumentContext } from '../../page';
import { ElementHandle } from 'puppeteer-core';
import { getElements } from '../../element';
import { getElementIndexByText } from './getElementIndexByText';

export async function getElementFromArrayByText(
  context: DocumentContext,
  elements: SelectorOrElements,
  text: string,
  ignoreCase = false,
): Promise<ElementHandle> {
  const targetElements = await getElements(context, elements);
  const index = await getElementIndexByText(
    context,
    targetElements,
    text,
    ignoreCase,
  );
  if (index !== -1) {
    return targetElements[index];
  }
  throw new Error(`Element with text ${text} was not found in array`);
}