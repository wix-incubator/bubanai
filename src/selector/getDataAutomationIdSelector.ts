import { getSelectorWithAttributeType } from './getSelectorWithAttributeType';
import type { AttributeMatcher } from './types';
import { AttributeType } from './types';

/**
 * Returns data-automation-id selector string.
 * Supports `=, *=, ^=, $=` matchers.
 * @param key Selector value string
 * @param attributeMatcher Matcher
 *
 * @example `getDataAutomationIdSelector('open', AttributeMatcher.CONTAINS)` returns `[data-automation-id*=open]`
 *
 * @category Selectors
 */
export function getDataAutomationIdSelector(
  key: string,
  attributeMatcher?: AttributeMatcher,
) {
  return getSelectorWithAttributeType(
    key,
    AttributeType.DATA_AUTOMATION_ID,
    attributeMatcher,
  );
}
