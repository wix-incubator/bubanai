import { ElementHandle, Page } from 'puppeteer';

import { getBoundingBox, getCenter } from '../boundingBox';
import { dragTo } from './dragTo';
import { DragOptions } from './types';
import { waitForValueToStopChanging } from '../waits';

export async function dragElementToElement(
  page: Page,
  fromElement: ElementHandle,
  toElement: ElementHandle,
  dragOptions?: DragOptions,
): Promise<void> {
  let elementBoundingBox = await getBoundingBox(fromElement);
  const from = getCenter(elementBoundingBox);

  elementBoundingBox = await getBoundingBox(toElement);
  const to = getCenter(elementBoundingBox);

  await dragTo(page, from, to, dragOptions);
  await waitForValueToStopChanging(() => getBoundingBox(fromElement));
}
