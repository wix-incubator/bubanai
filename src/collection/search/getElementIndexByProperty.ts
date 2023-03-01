import {
  ElementPropertyType,
  SelectorOrElements,
  getElements,
} from '../../element';
import { DocumentContext } from '../../page';

/**
 * Returns element index that has exact property value
 * @param context Page or Frame
 * @param elements Elements array or selector
 * @param property ElementPropertyType or string
 * @param value Property value
 *
 * @category Collections search
 */
export async function getElementIndexByProperty(
  context: DocumentContext,
  elements: SelectorOrElements,
  property: ElementPropertyType,
  value: string,
): Promise<number> {
  const targetElements = await getElements(context, elements);
  const propertyValues = await Promise.all(
    targetElements.map((option) =>
      context.evaluate((e, prop) => e[prop], option, property),
    ),
  );
  return propertyValues.indexOf(value);
}
