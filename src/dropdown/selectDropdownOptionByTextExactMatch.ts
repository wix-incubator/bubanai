import { getText, SelectorOrElement } from '../element';
import { DocumentContext } from '../page';
import { openDropdown } from './openDropdown';
import { mapAsync } from '../collection';
import { selectOptionByIndex } from './selectOptionByIndex';

/**
 * Opens dropdown and select option by text exact match.
 * @param context Page or Frame
 * @param dropdownOpenSelectorOrElement Open dropdown element or it's selector.
 * @param dropdownOptionsSelector Dropdown Options selector
 * @param text Target text
 */
export async function selectDropdownOptionByTextExactMatch(
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
  await selectOptionByIndex(context, dropdownOptionsElements, index, text);
}
