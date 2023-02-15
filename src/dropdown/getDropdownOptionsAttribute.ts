import { AttributeType } from '../selector';
import { getAttribute, SelectorOrElement } from '../element';
import { DocumentContext } from '../page';
import { mapAsync } from '../collection';
import { openDropdown } from './openDropdown';

export async function getDropdownOptionsAttribute(
  context: DocumentContext,
  dropdownOpenSelectorOrElement: SelectorOrElement,
  dropdownOptionsSelector: string,
  attributeType: AttributeType,
) {
  const dropdownOptionsElements = await openDropdown(
    context,
    dropdownOpenSelectorOrElement,
    dropdownOptionsSelector,
  );
  return mapAsync(dropdownOptionsElements, (target) =>
    getAttribute(attributeType, context, target),
  );
}
