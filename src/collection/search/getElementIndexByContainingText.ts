import { DocumentContext } from '../../page';
import { getElementsTextsFromArray } from './getElementTextsFromArray';
import type { SelectorOrElements } from '../../element';

export async function getElementIndexByContainingText(
  context: DocumentContext,
  elements: SelectorOrElements,
  text: string,
  ignoreCase = false,
): Promise<number> {
  const textOptions = await getElementsTextsFromArray(context, elements);
  return ignoreCase
    ? textOptions.findIndex((opt) =>
        opt.toLowerCase().includes(text.toLowerCase()),
      )
    : textOptions.findIndex((opt) => opt.includes(text));
}
