import { SelectorOrElement } from '../element';
import { DocumentContext } from '../page';
import { openDropdown } from './openDropdown';
import { selectOptionByIndex } from './selectOptionByIndex';
import { findIndex } from 'lodash';

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
      context.evaluate((e) => e.attributes.value.nodeValue, option),
    ),
  );
  const index = findIndex(valueOptions, (opt) => opt.includes(value));
  await selectOptionByIndex(context, dropdownOptionsElements, index, value);
}
