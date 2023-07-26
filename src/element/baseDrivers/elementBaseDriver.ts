import type { DocumentContext } from '../../page';
import type {
  BoundingBox,
  ScreenshotOptions,
  ClickOptions,
  WaitForSelectorOptions,
  Page,
} from 'puppeteer-core';

import { ACTION_SMALL_TIMEOUT } from '../../settings';
import { getElement } from '../general/getElement';
import { getBoundingBox } from '../../boundingBox';
import {
  waitForConditionWithoutException,
  waitForValueToStopChanging,
} from '../../waits';
import { waitToBeNotVisible } from '../waits/waitToBeNotVisible';
import { getElements } from '../general/getElements';
import type { SearchElementsOptions } from '../types';
import { elementBySelectorType } from '../utils';

/**
 * Wrapper for element.
 * Supports context model.
 * If custom context (Frame or another Page) would be defined, it would be used,
 * otherwise would be used default context.
 *
 * @category Element Base
 */
export abstract class ElementBaseDriver {
  context: DocumentContext = this.customContext ?? this.defaultContext;

  protected constructor(
    protected defaultContext: Page,
    protected customContext?: DocumentContext,
  ) {}

  abstract get rootSelector(): string;

  /**
   * Returns selector which is child from root.
   * @param selector
   * @protected
   *
   * @category Element Base
   */
  protected withRootSelector(selector: string) {
    return `${this.rootSelector} ${selector}`;
  }

  /**
   * Returns Element handle from rootSelector
   * @protected
   *
   * @category Element Base
   */
  protected async getRootElement() {
    return getElement(this.context, this.rootSelector);
  }

  /**
   * Clicks on element with rootSelector
   * @param options
   * @protected
   *
   * @category Element Base
   */
  protected async click(options?: ClickOptions) {
    return this.getRootElement().then((el) => el.click(options));
  }

  /**
   * Performs hover for element with rootSelector
   * @protected
   *
   * @category Element Base
   */
  protected async hover() {
    return this.getRootElement().then((el) => el.hover());
  }

  /**
   * Gets inner Elements array by selector which is child from root element.
   * Doesn't wait for anything.
   * @param selector
   * @param options
   * @protected
   *
   * @category Element Base
   */
  protected async getInnerElements(
    selector: string,
    options?: SearchElementsOptions,
  ) {
    return getElements(this.context, this.withRootSelector(selector), options);
  }

  /**
   * Gets inner Element by selector which is child from root element.
   * Returns null if element does not exist.
   * Doesn't wait for anything (not safe to use).
   * @param selector
   * @protected
   *
   * @category Element Base
   */
  protected async getInnerElement(selector: string) {
    const innerElements = await this.getInnerElements(selector);
    return innerElements[0] || null;
  }

  /**
   * Waits for inner Element by selector which is child from root element.
   * If does not exist - throws exception.
   * @param selector
   * @param options
   * @protected
   *
   * @category Element Base
   */
  protected async waitForInnerElement(
    selector: string,
    options?: WaitForSelectorOptions,
  ) {
    return this.waitForSelector(this.withRootSelector(selector), options);
  }

  /**
   * Waits for Element from root of context level (Page or Frame).
   * If does not exist - throws exception.
   * @param selector
   * @param options
   * @param context Page or Frame. By default - current context.
   * @protected
   *
   * @category Element Base
   */
  protected async waitForSelector(
    selector: string,
    options?: WaitForSelectorOptions,
    context: DocumentContext = this.context,
  ) {
    return getElement(context, selector, options);
  }

  /**
   * Clicks on inner Element by selector which is child from root element.
   * If does not exist - throws exception.
   * @param selector
   * @param options
   * @protected
   *
   * @category Element Base
   */
  protected clickOnInnerElement(selector: string, options?: ClickOptions) {
    return this.waitForInnerElement(selector).then((el) => el.click(options));
  }

  /**
   * Hovers inner Element by selector which is child from root element.
   * If does not exist - throws exception.
   * @param selector
   * @protected
   *
   * @category Element Base
   */
  protected hoverInnerElement(selector: string) {
    return this.waitForInnerElement(selector).then((el) => el.hover());
  }

  /**
   * Checks if child element of root element exists.
   * @param selector
   * @protected
   *
   * @category Element Base
   */
  protected async isInnerElementExist(selector: string): Promise<boolean> {
    return Boolean(await this.getInnerElement(selector));
  }

  /**
   * Checks if element with rootSelector exists.
   * @protected
   *
   * @category Element Base
   */
  async isExist(): Promise<boolean> {
    const isExist = await elementBySelectorType(
      this.context,
      this.rootSelector,
    );
    return !!isExist;
  }

  /**
   * Checks if element with rootSelector is in viewport.
   * @protected
   *
   * @category Element Base
   */
  async isInViewport() {
    return this.getRootElement().then((el) => el.isIntersectingViewport());
  }

  /**
   * Perform screenshot on element with rootSelector.
   * Waits for element position not jumping before screenshot.
   * @protected
   *
   * @category Element Base
   */
  async screenshot() {
    const options: ScreenshotOptions = {
      clip: await this.waitToBeShown().then((el) => getBoundingBox(el)),
    };
    return this.defaultContext.screenshot(options);
  }

  /**
   * Perform screenshot on child element of element with rootSelector.
   * Waits for element position not jumping before screenshot.
   * @protected
   *
   * @category Element Base
   */
  async screenshotInnerElement(selector: string) {
    const element = await this.waitForInnerElement(selector);
    await this.waitForPositionToBeStable(selector);
    const options: ScreenshotOptions = {
      clip: await getBoundingBox(element),
    };
    return this.defaultContext.screenshot(options);
  }

  /**
   * Checks if element does exist after wait.
   * Useful when you expect when you do some action and want to check if element
   * is still not appeared after it.
   * @param timeout
   *
   * @category Element Base
   */
  async isExistWithWait(timeout: number = ACTION_SMALL_TIMEOUT) {
    await waitForConditionWithoutException(
      () =>
        elementBySelectorType(this.context, this.rootSelector).then((r) => !!r),
      { timeoutMs: timeout },
    );
    return this.isInnerElementExist(this.rootSelector);
  }

  /**
   * Returns element with rootSelector.
   * Ensures that element is not jumping.
   *
   * @category Element Base
   */
  async waitToBeShown() {
    await this.getRootElement();
    await this.waitForPositionToBeStable();
    return this.getRootElement();
  }

  /**
   * Waits for element to stop jumping or rendering.
   * @param innerSelector
   *
   * @category Element Base
   */
  async waitForPositionToBeStable(innerSelector?: string) {
    return waitForValueToStopChanging(() =>
      elementBySelectorType(
        this.context,
        innerSelector
          ? this.withRootSelector(innerSelector)
          : this.rootSelector,
      )
        .then((el) => el && el.boundingBox())
        .then((box) => box && { x: box.x, y: box.y }),
    );
  }

  /**
   * Waits for element with rootSelector or it's child would disappear.
   * @param innerSelector
   *
   * @category Element Base
   */
  async waitToBeHidden(innerSelector?: string) {
    const hiddenSelector = innerSelector
      ? this.withRootSelector(innerSelector)
      : this.rootSelector;
    return waitToBeNotVisible(this.context, hiddenSelector);
  }

  /**
   * Gets bounding box of element with rootSelector.
   *
   * @category Element Base
   */
  async getBoundingBox(): Promise<BoundingBox> {
    return this.getRootElement().then((el) => getBoundingBox(el));
  }
}
