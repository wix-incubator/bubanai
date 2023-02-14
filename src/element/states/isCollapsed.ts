import { ElementHandle } from 'puppeteer-core';
import { hasClass } from './hasClass';

export async function isCollapsed(element: ElementHandle) {
  return hasClass(element, 'closed');
}
