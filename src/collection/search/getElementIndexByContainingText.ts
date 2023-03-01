import { DocumentContext } from '../../page';
import { getElementsTextsFromArray } from './getElementsTextsFromArray';
import type { SelectorOrElements } from '../../element';

/**
 * Returns index of element that contain defined text. Can be also user in ignore case mode.
 * @param context Page or Frame
 * @param elements Elements array or selector
 * @param text Text
 * @param ignoreCase Ignore case option (default - false)
 *
 * @category Collections search
 */
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
