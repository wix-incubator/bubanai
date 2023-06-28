import type { SelectorOrElement } from '../element';
import type { DocumentContext } from '../page';
import { openDropdown } from './openDropdown';

/**
 * Opens dropdown and returns dropdown option by selector. If option does not exist,
 * throws an exception.
 * @param context Page or Frame
 * @param dropdownOpenSelector Dropdown open element or it's selector
 * @param dropdownOptionSelector Target option selector
 *
 * @category Dropdown
 */
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
