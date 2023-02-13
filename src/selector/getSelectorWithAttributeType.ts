import { AttributeMatcher, AttributeType } from './types';

export function getSelectorWithAttributeType(
  key: string,
  attributeType: AttributeType,
  attributeMatcher?: AttributeMatcher,
) {
  const attributeMatcherString = attributeMatcher
    ? attributeMatcher
    : AttributeMatcher.EQUALS;
  return `[${attributeType}${attributeMatcherString}"${key}" i]`;
}
