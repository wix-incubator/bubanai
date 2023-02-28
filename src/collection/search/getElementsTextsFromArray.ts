import { DocumentContext } from '../../page';
import { getElements } from '../../element';
import type { SelectorOrElements } from '../../element';

/**
 * Returns elements texts array.
 * @param context Page or Frame
 * @param elements Elements array or selector
 */
export async function getElementsTextsFromArray(
  context: DocumentContext,
  elements: SelectorOrElements,
) {
  const targetElements = await getElements(context, elements);
  return Promise.all(
    targetElements.map((option) =>
      context.evaluate(
        (e) => (e.innerText ? e.innerText : e.innerHtml),
        option,
      ),
    ),
  );
}
