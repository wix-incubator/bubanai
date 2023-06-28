import type { SelectorOrElement } from '../element';
import { getText } from '../element';
import type { DocumentContext } from '../page';
import { openDropdown } from './openDropdown';
import { mapAsync } from '../collection';

/**
 * Opens dropdown and gets all options text.
 * Order is guaranteed.
 * @param context Page or Frame
 * @param dropdownOpenSelectorOrElement Open dropdown element or it's selector
 * @param dropdownOptionsSelector Dropdown Options selector
 *
 * @category Dropdown
 */
export async function getDropdownOptions(
  context: DocumentContext,
  dropdownOpenSelectorOrElement: SelectorOrElement,
  dropdownOptionsSelector: string,
) {
  const dropdownOptionsElements = await openDropdown(
    context,
    dropdownOpenSelectorOrElement,
    dropdownOptionsSelector,
  );
  return mapAsync(dropdownOptionsElements, (target) =>
    getText(context, target),
  );
}
