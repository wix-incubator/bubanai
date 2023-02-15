import { getText, SelectorOrElement } from '../element';
import { DocumentContext } from '../page';
import { openDropdown } from './openDropdown';
import { mapAsync } from '../collection';

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
