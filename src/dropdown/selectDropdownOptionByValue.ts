import type { DocumentContext } from '../page';
import type { SelectorOrElement } from '../element';
import { openDropdown } from './openDropdown';
import { selectOptionByIndex } from './selectOptionByIndex';

/**
 * Opens dropdown and select option by value exact match of property 'value'.
 * @param context Page or Frame
 * @param dropdownOpenSelectorOrElement Open dropdown element, or it's selector
 * @param dropdownOptionsSelector Dropdown Options selector
 * @param value Value of property 'value'
 *
 * @category Dropdown
 */
export async function selectDropdownOptionByValue(
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
      context.evaluate((e) => e.attributes['value']?.nodeValue, option),
    ),
  );
  const index = valueOptions.indexOf(value);
  await selectOptionByIndex(context, dropdownOptionsElements, index, value);
}
