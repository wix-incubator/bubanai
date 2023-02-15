import { DocumentContext } from '../../page';
import { SelectorOrElement } from '../types';
import { WaitOptions } from '../../types';
import { waitForObjectsToBeEqual } from '../../waits';
import { getText } from '../props/getText';

export async function waitForElementToHaveText(
  context: DocumentContext,
  element: SelectorOrElement,
  text: string,
  waitOptions?: WaitOptions,
) {
  return waitForObjectsToBeEqual(
    () => getText(context, element),
    text,
    undefined,
    waitOptions,
  );
}
