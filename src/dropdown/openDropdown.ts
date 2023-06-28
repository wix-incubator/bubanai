import type { DocumentContext } from '../page';
import type { SelectorOrElement } from '../element';
import { getElement, getElements } from '../element';
import { waitForValueToStopChanging } from '../waits';

/**
 * Opens dropdown and returns array of dropdown option elements.
 * @param context Page or Frame
 * @param dropdownOpenSelectorOrElement Open dropdown element or it's selector
 * @param dropdownOptionsSelector Dropdown Options selector
 *
 * @category Dropdown
 */
export async function openDropdown(
  context: DocumentContext,
  dropdownOpenSelectorOrElement: SelectorOrElement,
  dropdownOptionsSelector: string,
) {
  const dropdownContainer = await getElement(
    context,
    dropdownOpenSelectorOrElement,
  );
  await dropdownContainer.hover();
  await dropdownContainer.click();
  await getElement(context, dropdownOptionsSelector);
  await waitForValueToStopChanging(() =>
    getElements(context, dropdownOptionsSelector).then((opt) => opt.length),
  );
  return getElements(context, dropdownOptionsSelector);
}
