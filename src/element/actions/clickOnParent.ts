import { DocumentContext } from '../../page';
import { getParent } from '../getParent';
import { SelectorOrElement } from '../types';

export async function clickOnParent(
  context: DocumentContext,
  elementOrSelector: SelectorOrElement,
): Promise<void> {
  return getParent(context, elementOrSelector).then((p) => p.click());
}
