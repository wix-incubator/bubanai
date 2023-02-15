import { DocumentContext } from '../page';
import { getElement, SelectorOrElement } from '../element';
import { waitForValueToStopChanging } from '../waits';

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
  await context.waitForSelector(dropdownOptionsSelector);
  await waitForValueToStopChanging(() =>
    context.$$(dropdownOptionsSelector).then((opt) => opt.length),
  );
  return context.$$(dropdownOptionsSelector);
}
