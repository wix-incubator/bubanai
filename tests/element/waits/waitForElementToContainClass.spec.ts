import {
  waitForElementToContainClass,
  TestError,
  getElement,
  wait,
  hasClass,
} from '../../../src';

describe('Element Waits: waitForElementToContainClass()', () => {
  beforeEach(async () => {
    await page.reload();
    await page.setContent(`
      <html lang="en">
        <head>
          <title>waitForElementToContainClass Example</title>
        </head>
        <body>
          <div class="box"></div>
        </body>
      </html>
    `);
  });

  it('should wait for the element to contain the specified class', async () => {
    const divElement = await getElement(page as never, '.box');
    const addClassToDiv = async () => {
      await wait(1300);
      await divElement.evaluate((el) => el.classList.add('focused_'));
    };
    addClassToDiv();
    await waitForElementToContainClass(page as never, divElement, 'focused', {
      timeoutMs: 1800,
    });

    const containClass = await hasClass(divElement, 'focused');
    expect(containClass).toBe(true);
  });

  it('should throw an error if the element does not contain the class within the timeout', async () => {
    const divElement = await getElement(page as never, '.box');
    const timeoutMs = 1000;

    await expect(
      waitForElementToContainClass(page as never, divElement, 'focused', {
        timeoutMs,
      }),
    ).rejects.toThrowError(
      TestError.ElementDoesNotHaveAttributePart('class', 'focused', timeoutMs),
    );
  });
});
