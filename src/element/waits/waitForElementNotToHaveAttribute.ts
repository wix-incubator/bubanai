import { waitFor } from '../../waitFor';
import { SelectorOrElement } from '../types';
import { AttributeType } from '../../selector';
import { DocumentContext } from '../../page';
import { getAttribute } from '../getAttribute';
import { DefaultWaitOptions, WaitOptions } from '../../types';

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
    `Element is still have attribute ${attribute}: ${value} after timeout ${
      waitOptions?.timeoutMs || DefaultWaitOptions.timeoutMs
    } s.`,
  );
}
