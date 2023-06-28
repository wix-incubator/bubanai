import type { DocumentContext } from '../../page';
import { getElement } from '../general/getElement';
import type { SelectorOrElement } from '../types';

/**
 * Perform remove keyboard focus for element.
 * @param context Page or Frame
 * @param elementOrSelector Element or selector
 *
 * @category Element Actions
 */
export async function blur(
  context: DocumentContext,
  elementOrSelector: SelectorOrElement,
): Promise<void> {
  const element = await getElement(context, elementOrSelector);
  await context.evaluate((e) => e.blur(), element);
}
