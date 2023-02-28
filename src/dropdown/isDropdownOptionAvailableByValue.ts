import { DocumentContext } from '../page';
import { isDisabled, SelectorOrElement } from '../element';
import { getDropdownOptionByValue } from './getDropdownOptionByValue';

/**
 * Opens dropdown and verifies that dropdown option with property value exists and not disabled.
 * @param context Page or Frame
 * @param dropdownOpenSelectorOrElement Open dropdown element or it's selector
 * @param dropdownOptionsSelector Dropdown Options selector
 * @param value Value of 'value' property
 */
export async function isDropdownOptionAvailableByValue(
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

  const isOptionExist = !!option;
  const isOptionDisabled = isOptionExist && (await isDisabled(context, option));
  return isOptionExist && !isOptionDisabled;
}
