import { hasClass } from './hasClass';
import { ElementHandle } from 'puppeteer-core';

export async function isExpanded(element: ElementHandle) {
  return hasClass(element, 'open');
}
