import {
  selectDropdownOptionBySelector,
  getElement,
  isSelected,
} from '../../src';
import { dropdownHtmlStructure } from './dropdownUtils.testKit';

describe('Dropdown: selectDropdownOptionBySelector()', () => {
  const dropdownOpenSelector = `#dropdown-open`;
  const dropdownOptionSelector = `[data-value='option4']`;

  beforeEach(async () => {
    await page.reload();
    await page.setContent(dropdownHtmlStructure);
  });

  it('should select the dropdown option by selector and wait for it to not be in viewport', async () => {
    await selectDropdownOptionBySelector(
      page as never,
      dropdownOpenSelector,
      dropdownOptionSelector,
      'option-not-intersecting-viewport',
    );

    const selectedOption = await getElement(
      page as never,
      dropdownOptionSelector,
    );

    expect(await selectedOption.isIntersectingViewport()).toBe(false);
    expect(await isSelected(selectedOption)).toBe(true);
  });

  it('should select the dropdown option by selector and wait for it to stop moving', async () => {
    await selectDropdownOptionBySelector(
      page as never,
      dropdownOpenSelector,
      dropdownOptionSelector,
      'option-stop-moving',
    );

    const selectedOption = await getElement(
      page as never,
      dropdownOptionSelector,
    );

    const initialBoundingBox = await selectedOption.boundingBox();
    await page.waitForTimeout(500);
    const finalBoundingBox = await selectedOption.boundingBox();

    expect(await isSelected(selectedOption)).toBe(true);
    expect(finalBoundingBox).toEqual(initialBoundingBox);
  });
});
