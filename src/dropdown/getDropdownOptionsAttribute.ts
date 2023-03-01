import { AttributeType } from '../selector';
import { getAttribute, SelectorOrElement } from '../element';
import { DocumentContext } from '../page';
import { mapAsync } from '../collection';
import { openDropdown } from './openDropdown';

/**
 * Opens dropdown and gets dropdown options` attribute value.
 * Order is guaranteed.
 * @param context Page or Frame
 * @param dropdownOpenSelectorOrElement Open dropdown element or it's selector
 * @param dropdownOptionsSelector Dropdown Options selector
 * @param attributeType Target attribute name
 *
 * @category Dropdown
 */
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
