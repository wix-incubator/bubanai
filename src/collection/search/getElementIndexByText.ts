import type { SelectorOrElements } from '../../element';
import type { DocumentContext } from '../../page';
import { getElements } from '../../element/general/getElements';
import { getText } from '../../element/props/getText';

/**
 * Returns index of element by text exact match. Can be also user in ignore case mode.
 * @param context Page or Frame
 * @param elements Elements array or selector
 * @param text Text
 * @param ignoreCase Ignore case option (default - false)
 *
 * @category Collections search
 */
export async function getElementIndexByText(
  context: DocumentContext,
  elements: SelectorOrElements,
  text: string,
  ignoreCase = false,
): Promise<number> {
  const targetElements = await getElements(context, elements);
  const textOptions = await Promise.all(
    targetElements.map((option) => getText(context, option)),
  );
  return ignoreCase
    ? textOptions.map((opt) => opt.toLowerCase()).indexOf(text.toLowerCase())
    : textOptions.indexOf(text);
}
