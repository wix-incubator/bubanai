import { DocumentContext } from '../page';
import { getElements, SelectorOrElements } from '../element';
import { wait } from '../waitFor';
import { ACTION_SMALL_TIMEOUT } from '../settings';

export async function selectOptionByIndex(
  context: DocumentContext,
  dropdownOptionsElements: SelectorOrElements,
  index: number,
  option: string | number,
) {
  const targetElements = await getElements(context, dropdownOptionsElements);
  if (index !== -1) {
    await targetElements[index].hover();
    await targetElements[index].click();
    // after click on dropdown option sometimes it's needed some time before another action.
    // Waiting for option is not visible doesn't work in all cases - some dropdowns doesn't close after option selection.
    await wait(ACTION_SMALL_TIMEOUT);
  } else {
    throw new Error(`Option ${option} is not found in dropdown`);
  }
}
