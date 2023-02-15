import { SelectorOrElement } from '../element';
import { DocumentContext } from '../page';
import { getDropdownOptionByValue } from './getDropdownOptionByValue';

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
