import type {
  ElementPropertyType,
  SearchElementOptions,
  SelectorOrElement,
} from '../types';
import type { DocumentContext } from '../../page';
import { getProperty } from '../props/getProperty';

/**
 * Checks if property exist on element and it's value is truthy
 * @param property Element property or string
 * @param context Page or Frame
 * @param selectorOrElement selector o ElementHandle
 * @param searchElementOptions Wait options
 * @category Element States
 */
export async function hasTruthyProperty(
  property: ElementPropertyType,
  context: DocumentContext,
  selectorOrElement: SelectorOrElement,
  searchElementOptions?: SearchElementOptions,
) {
  return getProperty(
    property,
    context,
    selectorOrElement,
    searchElementOptions,
  ).then((r) => !!r);
}
