import { DocumentContext } from '../../page';
import { getElements } from '../../element';
import type { SelectorOrElements } from '../../element';

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
