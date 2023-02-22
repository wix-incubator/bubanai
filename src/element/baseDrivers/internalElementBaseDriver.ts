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
import { waitForCollectionToBeNotEmpty } from '../../waits';
import { waitForElementPositionToBeStale } from '../waits/waitForElementPositionToBeStale';
import { waitForConditionToBeFalsy } from '../../waits/waitForConditionToBeFalsy';
import { getElement } from '../getElement';
import { getBoundingBox } from '../../boundingBox';
import { waitForScopedSelector } from '../waits/waitForScopedSelector';
import { isDisabled } from '../states/isDisabled';
import { waitToBeNotVisible } from '../waits/waitToBeNotVisible';

export class InternalElementBaseDriver {
  context: DocumentContext = this.customContext ?? this.defaultContext;
  constructor(
    protected element: ElementHandle,
    protected defaultContext: Page,
    protected customContext?: DocumentContext,
  ) {}

  async waitForInternalSelector(selector: string) {
    return waitForScopedSelector(this.context, this.element, selector);
  }

  async clickOnInternalElement(selector: string, options?: ClickOptions) {
    return this.waitForInternalSelector(selector).then((el) =>
      el.click(options),
    );
  }

  async isInternalElementExist(selector: string) {
    return this.element.$(selector).then((r) => !!r);
  }

  async hover() {
    return this.element.hover();
  }

  async click(options?: ClickOptions) {
    return this.element.click(options);
  }

  async scrollIntoView(alignToTop?: boolean) {
    return scrollIntoView(this.context, this.element, alignToTop);
  }

  async getInternalElementText(selector: string) {
    const element = await this.waitForInternalSelector(selector);
    return getText(this.context, element);
  }

  async isChecked() {
    return isChecked(this.context, this.element);
  }

  isSelected: (...args: any) => Promise<boolean> = async () =>
    isSelected(this.element);

  async getValue() {
    return getValue(this.context, this.element);
  }

  async isDisabled() {
    return isDisabled(this.context, this.element);
  }

  async getAttribute(attr: AttributeType) {
    return getAttribute(attr, this.context, this.element);
  }

  async getInnerElements(selector: string, shouldBeNotEmpty = false) {
    shouldBeNotEmpty &&
      (await waitForCollectionToBeNotEmpty(() => this.element.$$(selector)));
    return this.element.$$(selector);
  }

  async waitForPositionToBeStable() {
    return waitForElementPositionToBeStale(this.context, this.element);
  }

  async waitForInternalElementNotToExist(selector: string) {
    return waitForConditionToBeFalsy(() =>
      this.isInternalElementExist(selector),
    );
  }

  async waitForSelector(selector: string, options?: WaitForSelectorOptions) {
    return getElement(this.context, selector, options);
  }

  async waitToBeHidden() {
    return waitToBeNotVisible(this.context, this.element);
  }

  async getBoundingBox() {
    return getBoundingBox(this.element);
  }
}
