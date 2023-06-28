import type { ElementHandle } from 'puppeteer-core';
import { hasClass } from './hasClass';

/**
 * Checks if element has class 'closed'.
 * Can be project specific (will not work if closed class is not assigned to element on collapse).
 * @param element
 *
 * @category Element States
 */
export async function isCollapsed(element: ElementHandle) {
  return hasClass(element, 'closed');
}
