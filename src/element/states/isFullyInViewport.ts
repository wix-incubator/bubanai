import type { Offsets } from '../../boundingBox';
import type { DocumentContext } from '../../page';
import { getElements } from '../general/getElements';
import { getElement } from '../general/getElement';

/**
 * Checks if element is fully in viewport.
 * Helps when element.isIntersectingViewport() doesn't return correct value (example - for animations).
 * Supports getting element from array by index and offsets from borders of viewport.
 * @param context Page or Frame
 * @param selector Selector
 * @param index Element index (default - 0)
 * @param offsets Offsets from bottom and right border of viewport
 *
 * @category Element States
 */
export async function isFullyInViewport(
  context: DocumentContext,
  selector: string,
  index = 0,
  offsets: Offsets = { offsetX: 0, offsetY: 0 },
) {
  const _element = index
    ? await getElements(context, selector).then((els) => els[index])
    : await getElement(context, selector);
  return context.evaluate(
    (el, elementIndex, offset) => {
      const rect = el.getBoundingClientRect();

      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom - offset.offsetY <= window.innerHeight &&
        rect.right - offset.offsetX <= window.innerWidth
      );
    },
    _element,
    index,
    JSON.parse(JSON.stringify(offsets)),
  );
}
