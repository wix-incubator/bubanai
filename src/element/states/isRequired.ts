import { ElementHandle } from 'puppeteer-core';
import { DocumentContext } from '../../page';
import { getProperty } from '../getProperty';
import { ElementPropertyType } from '../types';

/**
 * Checks if element has required property.
 * @param context Page or Frame
 * @param element Element or selector
 *
 * @category Element States
 */
export async function isRequired(
  context: DocumentContext,
  element: ElementHandle,
) {
  return getProperty(ElementPropertyType.required, context, element);
}
