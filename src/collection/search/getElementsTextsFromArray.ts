import type { DocumentContext } from '../../page';
import { getElements } from '../../element/general/getElements';
import type { SelectorOrElements } from '../../element';
import { getText } from '../../element/props/getText';

/**
 * Returns text of all elements from array. Guarantees order.
 * @param context Page or Frame
 * @param elements Elements array or selector
 *
 * @category Collections search
 */
export async function getElementsTextsFromArray(
  context: DocumentContext,
  elements: SelectorOrElements,
) {
  const targetElements = await getElements(context, elements);
  return Promise.all(targetElements.map((option) => getText(context, option)));
}
