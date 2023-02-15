import { SelectorOrElement } from '../element';
import { DocumentContext } from '../page';
import { openDropdown } from './openDropdown';
import { selectOptionByIndex } from './selectOptionByIndex';

export async function selectDropdownOptionByIndex(
  context: DocumentContext,
  dropdownOpenSelectorOrElement: SelectorOrElement,
  dropdownOptionsSelector: string,
  index: number,
) {
  const dropdownOptionsElements = await openDropdown(
    context,
    dropdownOpenSelectorOrElement,
    dropdownOptionsSelector,
  );
  await selectOptionByIndex(context, dropdownOptionsElements, index, index);
}
