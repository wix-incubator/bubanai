import { ElementHandle } from 'puppeteer-core';
import { DocumentContext } from '../../page';
import { getElementIndexByContainingText } from './getElementIndexByContainingText';
import { getElements } from '../../element';
import type { SelectorOrElements } from '../../element';
import { TestError } from '../../error';

/**
 * Returns element from array that contain defined text. Can be also user in ignore case mode.
 * @param context Page or Frame
 * @param elements Elements array or selector
 * @param text Text
 * @param ignoreCase Ignore case option (default - false)
 *
 * @category Collections search
 */
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
  throw new Error(TestError.ContainedTextIsNotFoundInArray(text));
}
