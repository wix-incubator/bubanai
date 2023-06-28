import type { DocumentContext } from '../../page';
import { getElement } from '../general/getElement';
import type { SelectorOrElement } from '../types';

/**
 * Perform scroll to element.
 * @param context Page or Frame
 * @param element Element or selector
 * @param alignToTop Align to top of the viewport
 *
 * @category Element Actions
 */
export async function scrollIntoView(
  context: DocumentContext,
  element: SelectorOrElement,
  alignToTop = true,
) {
  const targetElement = await getElement(context, element);
  await context.evaluate(
    (e, align) => e.scrollIntoView(align),
    targetElement,
    alignToTop,
  );
}
