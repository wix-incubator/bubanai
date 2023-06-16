import { DocumentContext } from '../../page';
import { getAttribute, getElement } from '../../element';
import { AttributeType } from '../../selector';
import { getFrameByUrl } from './getFrameByUrl';
import { WaitOptions } from '../../types';

/**
 * Returns frame instance by it's css selector.
 * @param context Page or frame
 * @param selector CSS or xpath selector
 * @param waitOptions Frame wait options
 *
 * @category Frame Search
 */
export async function getFrameBySelector(
  context: DocumentContext,
  selector: string,
  waitOptions?: WaitOptions,
) {
  const iframeElement = await getElement(context, selector);
  const srcProperty = await getAttribute(
    AttributeType.SRC,
    context,
    iframeElement,
  );
  return getFrameByUrl(context, srcProperty, undefined, waitOptions);
}
