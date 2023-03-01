import { DocumentContext } from '../../page';
import { getAttribute, getElement } from '../../element';
import { AttributeType } from '../../selector';
import { getFrameByUrl } from './getFrameByUrl';

/**
 * Returns frame instance by it's css selector.
 * @param context Page or frame
 * @param selector CSS selector
 *
 * @category Frame Search
 */
export async function getFrameBySelector(
  context: DocumentContext,
  selector: string,
) {
  const iframeElement = await getElement(context, selector);
  const srcProperty = await getAttribute(
    AttributeType.SRC,
    context,
    iframeElement,
  );
  return getFrameByUrl(context, srcProperty);
}
