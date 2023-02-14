import { DocumentContext } from '../../page';
import { getElement } from '../getElement';
import { SelectorOrElement } from '../types';

export async function blur(
  context: DocumentContext,
  elementOrSelector: SelectorOrElement,
): Promise<void> {
  const element = await getElement(context, elementOrSelector);
  await context.evaluate((e) => e.blur(), element);
}
