import { DocumentContext } from '../../page';
import { SelectorOrElement } from '../types';
import { AttributeType } from '../../selector';
import { waitFor } from '../../waitFor';
import { getAttribute } from '../getAttribute';
import { DefaultWaitOptions, WaitOptions } from '../../types';

export function waitForElementToHaveAttribute(
  context: DocumentContext,
  element: SelectorOrElement,
  attribute: AttributeType,
  value: string,
  waitOptions?: WaitOptions,
) {
  return waitFor(
    async () => {
      const currentAttribute = await getAttribute(attribute, context, element);
      return currentAttribute.toString() === value;
    },
    waitOptions,
    `Element doesn't have attribute ${attribute}: ${value} after timeout ${
      waitOptions?.timeoutMs ?? DefaultWaitOptions.timeoutMs / 1000
    } s.`,
  );
}
