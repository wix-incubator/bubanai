import { DocumentContext } from '../../page';
import { getElement } from '../getElement';
import { SelectorOrElement } from '../types';

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
