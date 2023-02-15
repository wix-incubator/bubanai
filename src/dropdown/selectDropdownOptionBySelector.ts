import { openDropdown } from './openDropdown';
import { SelectorOrElement } from '../element';
import { DocumentContext } from '../page';
import { waitForValueToStopChanging } from '../waits';
import { waitForConditionToBeFalsy } from '../waits/waitForConditionToBeFalsy';

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
