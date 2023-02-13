import { getSelectorWithAttributeType } from './getSelectorWithAttributeType';
import { AttributeMatcher, AttributeType } from './types';

export function getClassSelector(
  key: string,
  attributeMatcher?: AttributeMatcher,
) {
  return attributeMatcher
    ? getSelectorWithAttributeType(key, AttributeType.CLASS, attributeMatcher)
    : `.${key}`;
}
