import { Page } from 'puppeteer-core';
import { getElement } from '../getElement';

import { DocumentContext } from '../../page';
import {
  DefaultTypeOptions,
  SearchElementOptions,
  SelectorOrElement,
  TypeOptions,
} from '../types';
import { defaults } from 'lodash';
import { clearFocusedInput } from './clearFocusedInput';
import { waitForValueToStopChanging } from '../../waits';
import { clickAtOffset } from './clickAtOffset';
import { blur } from './blur';

export async function type(
  text: string | number,
  defaultContext: Page,
  selectorOrElement: SelectorOrElement,
  searchElementOptions?: SearchElementOptions,
  typeOptions?: TypeOptions,
  customContext?: DocumentContext,
): Promise<void> {
  const context = customContext ?? defaultContext;
  const mutatedOptions = defaults(typeOptions, DefaultTypeOptions);
  const input = await getElement(
    context,
    selectorOrElement,
    searchElementOptions,
  );
  if (mutatedOptions && !mutatedOptions.withoutSelection) {
    await input.click();
    await clearFocusedInput(defaultContext);
  }
  await waitForValueToStopChanging(() =>
    context.evaluate((inputElm) => inputElm.value, input),
  );

  await input.type(text.toString(), mutatedOptions);
  if (mutatedOptions && mutatedOptions.applyFunc) {
    await mutatedOptions.applyFunc();
  } else {
    await blur(context, input);
    await clickAtOffset(defaultContext, input, {
      offsetX: -5,
      offsetY: -5,
    }).catch(console.error);
  }
  await waitForValueToStopChanging(() =>
    context.evaluate((inputElm) => inputElm.value, input),
  );
}
