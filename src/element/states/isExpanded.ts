import { hasClass } from './hasClass';
import { ElementHandle } from 'puppeteer-core';

/**
 * Checks if element has class 'open'.
 * Can be project specific (will not work if open class is not assigned to element on expand).
 * @param element
 *
 * @category Element States
 */
export async function isExpanded(element: ElementHandle) {
  return hasClass(element, 'open');
}
