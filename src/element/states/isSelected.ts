import { ElementHandle } from 'puppeteer-core';
import { hasClass } from './hasClass';

/**
 * Checks if element has class 'selected'.
 * Can be project specific (will not work if selected class is not assigned to element on selection).
 * @param element
 *
 * @category Element States
 */
export async function isSelected(element: ElementHandle): Promise<boolean> {
  return hasClass(element, 'selected');
}
