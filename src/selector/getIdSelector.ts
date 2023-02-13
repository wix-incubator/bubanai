import { AttributeMatcher, AttributeType } from './types';
import { getSelectorWithAttributeType } from './getSelectorWithAttributeType';

export function getIdSelector(
  key: string,
  attributeMatcher?: AttributeMatcher,
) {
  return attributeMatcher
    ? getSelectorWithAttributeType(key, AttributeType.ID, attributeMatcher)
    : `#${key}`;
}
