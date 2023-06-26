import { DocumentContext } from '../page';
import { getElements, SelectorOrElements } from '../element';
import { wait } from '../waitFor';
import { ACTION_SMALL_TIMEOUT } from '../settings';
import { TestError } from '../error';

/**
 * Selects option from element array by index.
 * @param context Page or Frame
 * @param dropdownOptionsElements Selector or Element
 * @param index Target index
 * @param option Option description (for exception)
 *
 * @category Dropdown
 */
export async function selectOptionByIndex(
  context: DocumentContext,
  dropdownOptionsElements: SelectorOrElements,
  index: number,
  option?: string | number,
) {
  const targetElements = await getElements(context, dropdownOptionsElements);
  if (index !== -1 && targetElements.length >= index + 1) {
    await targetElements[index].hover();
    await targetElements[index].click();
    // after click on dropdown option sometimes it's needed some time before another action.
    // Waiting for option is not visible doesn't work in all cases - some dropdowns doesn't close after option selection.
    await wait(ACTION_SMALL_TIMEOUT);
  } else {
    throw new Error(TestError.OptionIsNotFound(option ?? index));
  }
}
