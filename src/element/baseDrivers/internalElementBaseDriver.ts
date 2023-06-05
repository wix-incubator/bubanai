import { DocumentContext } from '../../page';
import {
  ClickOptions,
  ElementHandle,
  Page,
  WaitForSelectorOptions,
} from 'puppeteer-core';
import { scrollIntoView } from '../actions/scrollIntoView';
import { getText } from '../props/getText';
import { isChecked } from '../states/isChecked';
import { isSelected } from '../states/isSelected';
import { getValue } from '../props/getValue';
import { AttributeType } from '../../selector';
import { getAttribute } from '../getAttribute';
import {
  waitForCollectionToBeNotEmpty,
  waitForConditionToBeFalsy,
} from '../../waits';
import { waitForElementPositionToBeStale } from '../waits/waitForElementPositionToBeStale';

import { getElement } from '../getElement';
import { getBoundingBox } from '../../boundingBox';
import { waitForScopedSelector } from '../waits/waitForScopedSelector';
import { isDisabled } from '../states/isDisabled';
import { waitToBeNotVisible } from '../waits/waitToBeNotVisible';

/**
 * Wrapper for element entity which has already been initialized.
 * Supports context model.
 * If custom context (Frame or another Page) would be defined, it would be used,
 * otherwise would be used default context.
 *
 * @category Element Base
 */
export class InternalElementBaseDriver {
  context: DocumentContext = this.customContext ?? this.defaultContext;
  constructor(
    protected element: ElementHandle,
    protected defaultContext: Page,
    protected customContext?: DocumentContext,
  ) {}

  /**
   * Waits for internal element which is child from root element on current context.
   * Supports css or xPath selectors.
   * If does not found - throws an exception.
   * @param selector
   *
   * @category Element Base
   */
  async waitForInternalSelector(selector: string) {
    return waitForScopedSelector(this.context, this.element, selector);
  }

  /**
   * Clicks on internal element which is child from root element on current context.
   * Supports css or xPath selectors.
   * If does not found - throws an exception.
   * @param selector
   * @param options
   *
   * @category Element Base
   */
  async clickOnInternalElement(selector: string, options?: ClickOptions) {
    return this.waitForInternalSelector(selector).then((el) =>
      el.click(options),
    );
  }

  /**
   * Checks if child element from root element exists.
   * Supports only css selectors.
   * @param selector
   *
   * @category Element Base
   */
  async isInternalElementExist(selector: string) {
    return this.element.$(selector).then((r) => !!r);
  }

  /**
   * Hovers root element.
   *
   * @category Element Base
   */
  async hover() {
    return this.element.hover();
  }

  /**
   * Clicks on root element.
   * @param options
   *
   * @category Element Base
   */
  async click(options?: ClickOptions) {
    return this.element.click(options);
  }

  /**
   * Scrolls to root element.
   * @param alignToTop
   *
   * @category Element Base
   */
  async scrollIntoView(alignToTop?: boolean) {
    return scrollIntoView(this.context, this.element, alignToTop);
  }

  /**
   * Gets text of internal element which is child from root element on current context.
   * Supports css or xPath selectors.
   * If does not found - throws an exception.
   * @param selector
   *
   * @category Element Base
   */
  async getInternalElementText(selector: string) {
    const element = await this.waitForInternalSelector(selector);
    return getText(this.context, element);
  }

  /**
   * Checks if root element has checked property.
   *
   * @category Element Base
   */
  async isChecked() {
    return isChecked(this.context, this.element);
  }

  /**
   * Checks if root element has selected class.
   *
   * @category Element Base
   */
  isSelected: (...args: any) => Promise<boolean> = async () =>
    isSelected(this.element);

  /**
   * Gets value property of root element.
   *
   * @category Element Base
   */
  async getValue() {
    return getValue(this.context, this.element);
  }

  /**
   * Checks if root element has disabled property or class.
   *
   * @category Element Base
   */
  async isDisabled() {
    return isDisabled(this.context, this.element);
  }

  /**
   * Gets attribute value of root element.
   * @param attr
   *
   * @category Element Base
   */
  async getAttribute(attr: AttributeType) {
    return getAttribute(attr, this.context, this.element);
  }

  /**
   * Gets child elements from root element.
   * Can wait for array to be not empty. (Default - doesn't wait)
   * Supports only css selectors.
   * @param selector
   * @param shouldBeNotEmpty
   *
   * @category Element Base
   */
  async getInnerElements(selector: string, shouldBeNotEmpty = false) {
    shouldBeNotEmpty &&
      (await waitForCollectionToBeNotEmpty(() => this.element.$$(selector)));
    return this.element.$$(selector);
  }

  /**
   * Waits for root element to stop jumping or rendering.
   *
   * @category Element Base
   */
  async waitForPositionToBeStable() {
    return waitForElementPositionToBeStale(this.context, this.element);
  }

  /**
   * Waits for child element from root element does not exist.
   * Supports only css selectors.
   * @param selector
   *
   * @category Element Base
   */
  async waitForInternalElementNotToExist(selector: string) {
    return waitForConditionToBeFalsy(() =>
      this.isInternalElementExist(selector),
    );
  }

  /**
   * Waits for element to exist from context root (Page or Frame).
   * If doesn't found - throws exception.
   * @param selector
   * @param options
   *
   * @category Element Base
   */
  async waitForSelector(selector: string, options?: WaitForSelectorOptions) {
    return getElement(this.context, selector, options);
  }

  /**
   * Waits for root element to be not visible.
   *
   * @category Element Base
   */
  async waitToBeHidden() {
    return waitToBeNotVisible(this.context, this.element);
  }

  /**
   * Gets bounding box of root element.
   *
   * @category Element Base
   */
  async getBoundingBox() {
    return getBoundingBox(this.element);
  }
}
