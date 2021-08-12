import { ElementHandle, Frame, Page } from 'puppeteer-core';
import { AttributeType, getAttribute } from '../getAttribute';
import { getElement, SearchElementOptions } from '../getElement';
import { ElementPropertyType, getProperty } from '../getProperty';
import { getClasses } from './getClasses';

/**
 * Verifies if the element is disabled by checking its `data-disabled` attribute,
 * `disabled` property, and `disabled` class value.
 *
 * @category Element States
 */
export async function isDisabled(
  context: Page | Frame,
  selectorOrElement: string | ElementHandle,
  searchElementOptions?: SearchElementOptions,
): Promise<boolean> {
  const element = await getElement(
    context,
    selectorOrElement,
    searchElementOptions,
  );

  const isDisabledAttribute = await getAttribute(
    AttributeType.DATA_DISABLED,
    context,
    element,
  );

  const isDisabledProperty = await getProperty(
    ElementPropertyType.DISABLED,
    context,
    element,
  );

  const classes = await getClasses(context, element);
  const isDisabledClass = classes.includes('disabled');

  return (
    isDisabledAttribute !== null ||
    isDisabledProperty !== null ||
    isDisabledClass
  );
}
