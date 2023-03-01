import { DocumentContext } from '../../page';
import { evaluateOnSelectorOrElement } from '../evaluateOnSelectorOrElement';
import { SelectorOrElement } from '../types';

/**
 * Gets inner html property.
 * @param context Page or Frame
 * @param element Element or selector
 *
 * @category Element Properties
 */
export async function getHtml(
  context: DocumentContext,
  element: SelectorOrElement,
): Promise<string> {
  return evaluateOnSelectorOrElement((e) => e.innerHTML, context, element);
}
