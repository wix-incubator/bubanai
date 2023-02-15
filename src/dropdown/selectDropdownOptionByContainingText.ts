import { getText, SelectorOrElement } from '../element';
import { DocumentContext } from '../page';
import { openDropdown } from './openDropdown';
import { mapAsync } from '../collection';
import { selectOptionByIndex } from './selectOptionByIndex';

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
    : context.$$(dropdownOptionsSelector));

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
