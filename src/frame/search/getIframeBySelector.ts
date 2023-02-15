import { DocumentContext } from '../../page';
import { getAttribute, getElement } from '../../element';
import { AttributeType } from '../../selector';
import { getFrameByUrl } from './getFrameByUrl';

export async function getIframeBySelector(
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
