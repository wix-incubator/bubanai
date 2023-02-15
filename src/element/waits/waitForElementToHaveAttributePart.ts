import { DocumentContext } from '../../page';
import { SelectorOrElement } from '../types';
import { AttributeType } from '../../selector';
import { waitFor } from '../../waitFor';
import { getAttribute } from '../getAttribute';
import { DefaultWaitOptions, WaitOptions } from '../../types';

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
    `Element doesn't have attribute ${attribute} with part ${valuePart} after timeout ${
      waitOptions?.timeoutMs || DefaultWaitOptions.timeoutMs
    } s`,
  );
}
