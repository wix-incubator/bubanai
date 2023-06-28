import { waitFor } from '../../waitFor';
import type { SelectorOrElement } from '../types';
import type { AttributeType } from '../../selector';
import type { DocumentContext } from '../../page';
import { getAttribute } from '../props/getAttribute';
import type { WaitOptions } from '../../types';
import { DefaultWaitOptions } from '../../types';
import { TestError } from '../../error';

/**
 * Waits for element not to have attribute value.
 * If it doesn't change after timeout - throws an exception.
 * @param context Page or Frame
 * @param element Element or selector
 * @param attribute Attribute name
 * @param value Attribute value (default - empty string)
 * @param waitOptions WaitOptions
 *
 * @example `await element.type('40');` <br>
 * `await waitForElementNotToHaveAttribute(page, element, 'value', '40');`
 *
 * @category Element Waits
 */
export function waitForElementNotToHaveAttribute(
  context: DocumentContext,
  element: SelectorOrElement,
  attribute: AttributeType,
  value = '',
  waitOptions?: WaitOptions,
) {
  return waitFor(
    async () => {
      const currentAttribute = await getAttribute(
        attribute,
        context,
        element,
      ).catch((e) => console.warn(e));
      if (!currentAttribute) {
        return true;
      }
      return currentAttribute.toString() !== value;
    },
    waitOptions,
    TestError.ElementStillHasAttribute(
      attribute,
      value,
      waitOptions?.timeoutMs ?? DefaultWaitOptions.timeoutMs,
    ),
  );
}
