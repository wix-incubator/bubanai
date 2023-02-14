import { ElementHandle } from 'puppeteer-core';
import { DocumentContext } from '../../page';
import { getProperty } from '../getProperty';
import { ElementPropertyType } from '../types';

export async function isRequired(
  context: DocumentContext,
  element: ElementHandle,
) {
  return getProperty(ElementPropertyType.required, context, element);
}
