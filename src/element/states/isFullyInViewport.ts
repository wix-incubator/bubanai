import { Offsets } from '../../boundingBox';
import { DocumentContext } from '../../page';

export async function isFullyInViewport(
  context: DocumentContext,
  selector: string,
  index = 0,
  offsets: Offsets = { offsetX: 0, offsetY: 0 },
) {
  return context.evaluate(
    (locator, elementIndex, offset) => {
      const el =
        elementIndex === 0
          ? document.querySelector(locator)
          : document.querySelectorAll(locator)[elementIndex];

      const rect = el.getBoundingClientRect();

      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom - offset.offsetY <= window.innerHeight &&
        rect.right - offset.offsetX <= window.innerWidth
      );
    },
    selector,
    index,
    JSON.parse(JSON.stringify(offsets)),
  );
}
