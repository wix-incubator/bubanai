import type { SelectorOrElement } from '../element';
import { DocumentContext } from '../page';
import { openDropdown } from './openDropdown';

export async function getDropdownOptionBySelector(
  context: DocumentContext,
  dropdownOpenSelector: SelectorOrElement,
  dropdownOptionSelector: string,
) {
  const [option] = await openDropdown(
    context,
    dropdownOpenSelector,
    dropdownOptionSelector,
  );
  return option;
}
