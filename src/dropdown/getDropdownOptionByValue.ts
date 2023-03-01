import { SelectorOrElement } from '../element';
import { DocumentContext } from '../page';
import { openDropdown } from './openDropdown';

/**
 * Opens dropdown and gets dropdown option by value element property.
 * @param context Page or Frame
 * @param dropdownOpenSelectorOrElement Open dropdown element or it's selector
 * @param dropdownOptionsSelector Dropdown Options selector
 * @param value Value of 'value' property
 *
 * @category Dropdown
 */
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
