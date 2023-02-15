import { DocumentContext } from '../../page';
import { SelectorOrElement } from '../types';
import { getAttribute } from '../getAttribute';
import { AttributeType } from '../../selector';
import { WaitOptions } from '../../types';
import { waitFor } from '../../waitFor';

export async function waitForAttributeToBeChanged(
  context: DocumentContext,
  element: SelectorOrElement,
  attribute: AttributeType,
  action: () => Promise<any>,
  waitOptions?: WaitOptions,
) {
  const defaultAttribute = await getAttribute(attribute, context, element);
  await action();
  await waitFor(
    async () =>
      defaultAttribute !== (await getAttribute(attribute, context, element)),
    waitOptions,
    `Attribute ${attribute} value wasn't changed after ${action.toString()}.`,
  );
}
