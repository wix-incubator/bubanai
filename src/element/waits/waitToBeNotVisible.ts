import { DocumentContext } from '../../page';

/**
 * Waits until the element will be not visible.
 *
 * @category Element Waits
 */
export async function waitToBeNotVisible(
  context: DocumentContext,
  selectorOrElement: string,
) {
  const defaultVisibilityOptions = {
    visible: false,
    hidden: true,
  };
  return context.waitForSelector(selectorOrElement, defaultVisibilityOptions);
}
