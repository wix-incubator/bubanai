import type { SelectorOrElement } from '../element';
import type { DocumentContext } from '../page';
import { openDropdown } from './openDropdown';
import { selectOptionByIndex } from './selectOptionByIndex';
import { findIndex } from 'lodash';

/**
 * Opens dropdown and select option by containing value of property 'value'.
 * @param context Page or Frame
 * @param dropdownOpenSelectorOrElement Open dropdown element, or it's selector
 * @param dropdownOptionsSelector Dropdown Options selector
 * @param value Value of property 'value'
 *
 * @category Dropdown
 */
export async function selectDropdownOptionByContainingValue(
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
  const index = findIndex(valueOptions, (opt) => opt && opt.includes(value));
  await selectOptionByIndex(context, dropdownOptionsElements, index, value);
}
