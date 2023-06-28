import type { SelectorOrElement } from '../element';
import type { DocumentContext } from '../page';
import { openDropdown } from './openDropdown';
import { selectOptionByIndex } from './selectOptionByIndex';

/**
 * Opens dropdown and selects dropdown option by index.
 * @param context Page or Frame
 * @param dropdownOpenSelectorOrElement Open dropdown element, or it's selector.
 * @param dropdownOptionsSelector Dropdown Options selector
 * @param index Target index
 *
 * @category Dropdown
 */
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
