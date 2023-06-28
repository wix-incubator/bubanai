import type { DocumentContext } from '../page';
import type { SearchElementOptions } from './types';
import { isXpath } from './types';
import type { ElementHandle } from 'puppeteer-core';

export async function elementBySelectorType(
  context: DocumentContext,
  selector: string,
) {
  const result = isXpath(selector)
    ? await context.$x(selector).then((els) => (els.length ? els[0] : null))
    : await context.$(selector);
  return result;
}

export async function internalElementBySelectorType(
  element: ElementHandle,
  selector: string,
) {
  const result = isXpath(selector)
    ? await element.$x(selector).then((els) => (els.length ? els[0] : null))
    : await element.$(selector);
  return result;
}

export async function elementsBySelectorType(
  context: DocumentContext,
  selector: string,
) {
  const result = isXpath(selector)
    ? await context.$x(selector)
    : await context.$$(selector);
  return result;
}

export async function internalElementsBySelectorType(
  element: ElementHandle,
  selector: string,
) {
  const result = isXpath(selector)
    ? await element.$x(selector)
    : await element.$$(selector);
  return result;
}

export async function waitBySelectorType(
  context: DocumentContext,
  selector: string,
  options?: SearchElementOptions,
) {
  const result = isXpath(selector)
    ? await context.waitForXPath(selector, options)
    : await context.waitForSelector(selector, options);
  return result;
}
