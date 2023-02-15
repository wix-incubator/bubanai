import { SelectorOrElement } from '../element';
import { DocumentContext } from '../page';
import { openDropdown } from './openDropdown';

export async function getDropdownOptionByValue(
  context: DocumentContext,
  dropdownOpenSelectorOrElement: SelectorOrElement,
  dropdownOptionsSelector: string,
  value: string,
) {
  const dropdownOptionsElements = await openDropdown(
    context,
    dropdownOpenSelectorOrElement,
    dropdownOptionsSelector,
  );
  const valueOptions = await Promise.all(
    dropdownOptionsElements.map((option) =>
      context.evaluate((e) => e.attributes.value.nodeValue, option),
    ),
  );
  const index = valueOptions.indexOf(value);
  return dropdownOptionsElements[index];
}
