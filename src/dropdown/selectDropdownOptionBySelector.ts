import { openDropdown } from './openDropdown';
import { SelectorOrElement } from '../element';
import { DocumentContext } from '../page';
import {
  waitForValueToStopChanging,
  waitForConditionToBeFalsy,
} from '../waits';

/**
 * Opens dropdown and selects dropdown option by selector.
 * Waits optionally for option to not exist or to not to be in viewport.
 * @param context Page or Frame
 * @param dropdownOpenSelector Open dropdown element, or it's selector.
 * @param dropdownOptionSelector Dropdown Options selector
 * @param waitTo Default - wait for option not to be in viewport. Also can wait for option not to exist.
 *
 * @category Dropdown
 */
export async function selectDropdownOptionBySelector(
  context: DocumentContext,
  dropdownOpenSelector: SelectorOrElement,
  dropdownOptionSelector: string,
  waitTo:
    | 'option-stop-moving'
    | 'option-not-intersecting-viewport' = 'option-not-intersecting-viewport',
) {
  const [option] = await openDropdown(
    context,
    dropdownOpenSelector,
    dropdownOptionSelector,
  );
  await option.click();
  waitTo === 'option-not-intersecting-viewport'
    ? await waitForConditionToBeFalsy(() => option.isIntersectingViewport())
    : await waitForValueToStopChanging(() => option.boundingBox());
}
