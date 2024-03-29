import type { SelectorOrElements } from '../../element';
import type { DocumentContext } from '../../page';
import { getElements } from '../../element/general/getElements';
import { getElementIndexByText } from './getElementIndexByText';
import { TestError } from '../../error';

/**
 * Returns element from array by text exact match. Can be also user in ignore case mode.
 * @param context Page or Frame
 * @param elements Elements array or selector
 * @param text Text
 * @param ignoreCase Ignore case option (default - false)
 *
 * @category Collections search
 */
export async function getElementFromArrayByText(
  context: DocumentContext,
  elements: SelectorOrElements,
  text: string,
  ignoreCase = false,
) {
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
  throw new Error(TestError.ExactTextIsNotFoundInArray(text));
}
