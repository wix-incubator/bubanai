import { SelectorOrElement } from '../element';
import { DocumentContext } from '../page';
import { getDropdownOptionByValue } from './getDropdownOptionByValue';

/**
 * Opens dropdown and verifies that dropdown option with property value exists.
 * @param context Page or Frame
 * @param dropdownOpenSelectorOrElement Open dropdown element or it's selector
 * @param dropdownOptionsSelector Dropdown Options selector
 * @param value Value of 'value' property
 */
export async function isDropdownOptionExistByValue(
  context: DocumentContext,
  dropdownOpenSelectorOrElement: SelectorOrElement,
  dropdownOptionsSelector: string,
  value: string,
): Promise<boolean> {
  const option = await getDropdownOptionByValue(
    context,
    dropdownOpenSelectorOrElement,
    dropdownOptionsSelector,
    value,
  );
  return !!option;
}
