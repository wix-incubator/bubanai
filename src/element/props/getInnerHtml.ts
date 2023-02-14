import { DocumentContext } from '../../page';
import { evaluateOnSelectorOrElement } from '../evaluateOnSelectorOrElement';
import { SelectorOrElement } from '../types';

export async function getHtml(
  context: DocumentContext,
  element: SelectorOrElement,
): Promise<string> {
  return evaluateOnSelectorOrElement((e) => e.innerHTML, context, element);
}
