import { DocumentContext } from '../page';
import {
  BoundingBox,
  ScreenshotOptions,
  ElementHandle,
  ClickOptions,
  WaitForSelectorOptions,
  Page,
} from 'puppeteer';

import { ACTION_SMALL_TIMEOUT } from '../settings';
import { getElement } from './getElement';
import { getBoundingBox } from '../boundingBox';
import {
  waitForConditionWithoutException,
  waitForValueToStopChanging,
} from '../waits';

export abstract class ElementBaseDriver {
  readonly context: DocumentContext = this.customContext ?? this.defaultContext;

  protected constructor(
    protected defaultContext: Page,
    protected customContext?: DocumentContext,
  ) {}

  abstract get rootSelector(): string;

  protected withRootSelector(selector: string) {
    return `${this.rootSelector} ${selector}`;
  }

  protected async getRootElement(): Promise<ElementHandle<Element>> {
    const result = await this.context.waitForSelector(this.rootSelector);
    if (!result) {
      throw new Error(
        `Root element with selector '${this.rootSelector}' was not found after timeout.`,
      );
    }
    return result;
  }

  protected async click(options?: ClickOptions) {
    return this.getRootElement().then((el) => el.click(options));
  }

  protected async hover() {
    return this.getRootElement().then((el) => el.hover());
  }

  protected async getInnerElements(
    selector: string,
  ): Promise<ElementHandle<Element>[]> {
    return this.context.$$(this.withRootSelector(selector));
  }

  protected async getInnerElement(
    selector: string,
  ): Promise<ElementHandle<Element> | null> {
    const innerElements = await this.getInnerElements(selector);
    return innerElements[0] || null;
  }

  protected async waitForInnerElement(
    selector: string,
    options?: WaitForSelectorOptions,
  ): Promise<ElementHandle<Element>> {
    return this.waitForSelector(this.withRootSelector(selector), options);
  }

  protected async waitForSelector(
    selector: string,
    options?: WaitForSelectorOptions,
    context: DocumentContext = this.context,
  ): Promise<ElementHandle<Element>> {
    return getElement(context, selector, options);
  }

  protected clickOnInnerElement(selector: string, options?: ClickOptions) {
    return this.waitForInnerElement(selector).then((el) => el.click(options));
  }

  protected hoverInnerElement(selector: string) {
    return this.waitForInnerElement(selector).then((el) => el.hover());
  }

  protected async isInnerElementExist(selector: string): Promise<boolean> {
    return Boolean(await this.getInnerElement(selector));
  }

  async isExist(): Promise<boolean> {
    const isExist = await this.context.$(this.rootSelector);
    return !!isExist;
  }

  async isInViewport() {
    return this.getRootElement().then((el) => el.isIntersectingViewport());
  }

  async screenshot() {
    const options: ScreenshotOptions = {
      clip: await this.waitToBeShown().then((el) => getBoundingBox(el)),
    };
    return this.defaultContext.screenshot(options);
  }

  async screenshotInnerElement(selector: string) {
    const element = await this.waitForInnerElement(selector);
    await this.waitForPositionToBeStable(selector);
    const options: ScreenshotOptions = {
      clip: await getBoundingBox(element),
    };
    return this.defaultContext.screenshot(options);
  }

  async isExistWithWait(timeout: number = ACTION_SMALL_TIMEOUT) {
    await waitForConditionWithoutException(
      () => this.context.$(this.rootSelector).then((r) => !!r),
      { timeoutMs: timeout },
    );
    return this.isInnerElementExist(this.rootSelector);
  }

  async waitToBeShown(): Promise<ElementHandle<Element>> {
    await this.getRootElement();
    await this.waitForPositionToBeStable();
    return this.getRootElement();
  }

  async waitForPositionToBeStable(innerSelector?: string) {
    return waitForValueToStopChanging(() =>
      this.context
        .$(
          innerSelector
            ? this.withRootSelector(innerSelector)
            : this.rootSelector,
        )
        .then((el) => el && el.boundingBox())
        .then((box) => box && { x: box.x, y: box.y }),
    );
  }

  async waitToBeHidden(
    innerSelector?: string,
  ): Promise<ElementHandle<Element>> {
    const hiddenSelector = innerSelector
      ? this.withRootSelector(innerSelector)
      : this.rootSelector;
    return this.context.waitForSelector(hiddenSelector, {
      hidden: true,
    }) as Promise<ElementHandle<Element>>;
  }

  async getBoundingBox(): Promise<BoundingBox> {
    return this.getRootElement().then((el) => getBoundingBox(el));
  }
}
