import { AttributeType } from '../../selector';
import { getAttribute } from '../getAttribute';
import { getElement } from '../getElement';
import { getProperty } from '../getProperty';
import { DocumentContext } from '../../page';
import { hasClass } from './hasClass';
import { ElementPropertyType, SelectorOrElement } from '../types';

/**
 * Verifies if the element is disabled by checking its `data-disabled` attribute,
 * `disabled` property, and `disabled` class value.
 *
 * @category Element States
 */
export async function isDisabled(
  context: DocumentContext,
  selectorOrElement: SelectorOrElement,
  customAttribute?: AttributeType,
): Promise<boolean> {
  const element = await getElement(context, selectorOrElement);

  const disabled = customAttribute
    ? (await getAttribute(customAttribute, context, element)) === 'true'
    : await getProperty(ElementPropertyType.disabled, context, element);
  const isDisabledOption = await hasClass(element, 'disabled');

  return !!disabled || isDisabledOption;
}
