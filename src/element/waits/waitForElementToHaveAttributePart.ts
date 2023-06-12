import { DocumentContext } from '../../page';
import { SelectorOrElement } from '../types';
import { AttributeType } from '../../selector';
import { waitFor } from '../../waitFor';
import { getAttribute } from '../getAttribute';
import { DefaultWaitOptions, WaitOptions } from '../../types';
import { TestError } from '../../error';

/**
 * Waits for element to have attribute value part (NOT exact match).
 * @param context Page or Frame
 * @param element Element or selector
 * @param attribute Attribute name
 * @param valuePart Attribute value part
 * @param waitOptions WaitOptions
 *
 * @example `await element.type('40 <script>alert('')</script>');` <br>
 * `await waitForElementToHaveAttributePart(page, element, 'value', '40');`
 *
 * @category Element Waits
 */
export function waitForElementToHaveAttributePart(
  context: DocumentContext,
  element: SelectorOrElement,
  attribute: AttributeType,
  valuePart: string,
  waitOptions?: WaitOptions,
) {
  return waitFor(
    async () => {
      const currentAttribute = await getAttribute(attribute, context, element);
      return currentAttribute.toString().indexOf(valuePart) !== -1;
    },
    waitOptions,
    TestError.ElementDoesNotHaveAttributePart(
      attribute,
      valuePart,
      waitOptions?.timeoutMs ?? DefaultWaitOptions.timeoutMs,
    ),
  );
}
