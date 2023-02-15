import { SelectorOrElement } from '../types';
import { DocumentContext } from '../../page';
import { waitForElementToHaveAttributePart } from './waitForElementToHaveAttributePart';
import { AttributeType } from '../../selector';
import { WaitOptions } from '../../types';

export function waitForElementToContainClass(
  context: DocumentContext,
  element: SelectorOrElement,
  valuePart: string,
  waitOptions?: WaitOptions,
) {
  return waitForElementToHaveAttributePart(
    context,
    element,
    AttributeType.CLASS,
    valuePart,
    waitOptions,
  );
}
