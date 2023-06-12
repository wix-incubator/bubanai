import { DocumentContext } from '../../page';
import { SelectorOrElement } from '../types';
import { getAttribute } from '../getAttribute';
import { AttributeType } from '../../selector';
import { DefaultWaitOptions, WaitOptions } from '../../types';
import { waitFor } from '../../waitFor';
import { TestError } from '../../error';

/**
 * Waits for attribute value of element to be changed after async action.
 * If it doesn't changed after timeout - throws an exception.
 * @param context Page or Frame
 * @param element Element or selector
 * @param attribute Attribute name
 * @param action Async function after which attribute should be changed
 * @param waitOptions WaitOptions
 *
 * @example `await waitForAttributeToBeChanged(page, element, 'value', () => driver.type(40));`
 *
 * @category Element Waits
 */
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
    TestError.AttributeWasNotChanged(
      attribute,
      action,
      waitOptions?.timeoutMs ?? DefaultWaitOptions.timeoutMs,
    ),
  );
}
