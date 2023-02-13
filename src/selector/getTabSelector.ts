import { getSelectorWithAttributeType } from './getSelectorWithAttributeType';
import { AttributeMatcher, AttributeType } from './types';

export function getTabSelector(
  key: string,
  attributeMatcher?: AttributeMatcher,
) {
  return getSelectorWithAttributeType(key, AttributeType.TAB, attributeMatcher);
}
