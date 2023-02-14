import {
  ElementPropertyType,
  SelectorOrElements,
  getElements,
} from '../../element';
import { DocumentContext } from '../../page';

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
