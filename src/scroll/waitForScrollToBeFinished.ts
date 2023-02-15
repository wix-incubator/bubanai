import { DocumentContext } from '../page';
import { waitForValueToStopChanging } from '../waits';
import { getScroll } from './getScroll';
import { WaitOptions } from '../types';

export async function waitForScrollToBeFinished(
  context: DocumentContext,
  waitOptions?: WaitOptions,
) {
  return waitForValueToStopChanging(
    () => getScroll(context).then((scroll) => scroll.y),
    waitOptions,
  );
}
