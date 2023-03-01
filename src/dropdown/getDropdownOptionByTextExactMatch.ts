import { getText, SelectorOrElement } from '../element';
import { DocumentContext } from '../page';
import { openDropdown } from './openDropdown';
import { mapAsync } from '../collection';

/**
 * Opens dropdown and gets dropdown option by text exact match.
 * @param context Page or Frame
 * @param dropdownOpenSelectorOrElement Open dropdown element or it's selector
 * @param dropdownOptionsSelector Dropdown Options selector
 * @param text Target text
 *
 * @category Dropdown
 */
export async function getDropdownOptionByTextExactMatch(
  context: DocumentContext,
  dropdownOpenSelectorOrElement: SelectorOrElement,
  dropdownOptionsSelector: string,
  text: string,
) {
  const dropdownOptionsElements = await openDropdown(
    context,
    dropdownOpenSelectorOrElement,
    dropdownOptionsSelector,
  );
  const textOptions = await mapAsync(dropdownOptionsElements, (target) =>
    getText(context, target),
  );
  const index = textOptions.indexOf(text);
  return dropdownOptionsElements[index];
}
