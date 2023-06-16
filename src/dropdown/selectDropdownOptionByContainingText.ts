import { getElements, getText, SelectorOrElement } from '../element';
import { DocumentContext } from '../page';
import { openDropdown } from './openDropdown';
import { mapAsync } from '../collection';
import { selectOptionByIndex } from './selectOptionByIndex';

/**
 * Opens dropdown (if needed) and select option by containing text.
 * @param context Page or Frame
 * @param dropdownOpenSelectorOrElement Open dropdown element or it's selector or null.
 * If null - doesn't click on open dropdown element.
 * @param dropdownOptionsSelector Dropdown Options selector
 * @param text Target text
 *
 * @category Dropdown
 */
export async function selectDropdownOptionByContainingText(
  context: DocumentContext,
  dropdownOpenSelectorOrElement: SelectorOrElement | null,
  dropdownOptionsSelector: string,
  text: string,
) {
  const dropdownOptionsElements = await (dropdownOpenSelectorOrElement
    ? openDropdown(
        context,
        dropdownOpenSelectorOrElement,
        dropdownOptionsSelector,
      )
    : getElements(context, dropdownOptionsSelector));

  const textOptions = await mapAsync(dropdownOptionsElements, (target) =>
    getText(context, target),
  );

  let index = -1;
  for (let i = 0; i < textOptions.length; i++) {
    if (textOptions[i].indexOf(text) !== -1) {
      index = i;
      break;
    }
  }
  await selectOptionByIndex(context, dropdownOptionsElements, index, text);
}
