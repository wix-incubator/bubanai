import { DocumentContext } from '../page';
import { isDisabled, SelectorOrElement } from '../element';
import { getDropdownOptionByValue } from './getDropdownOptionByValue';

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
