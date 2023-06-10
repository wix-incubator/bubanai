import { isDisabled } from '../../../src';

describe('Element States: isDisabled()', () => {
  beforeAll(async () => {
    const htmlContent = `
      <html>
        <head></head>
        <body>
          <button id="disabledButton" class="disabled">Disabled Button</button>
          <button id="disabledButton1" data-disabled="true">Disabled Button</button>
          <button id="disabledButton2" disabled>Disabled Button</button>
          <button id="enabledButton">Enabled Button</button>
        </body>
      </html>
    `;
    await page.setContent(htmlContent);
  });

  it('should return false if the element is not disabled', async () => {
    const isDisabledValue = await isDisabled(page as never, '#enabledButton');
    expect(isDisabledValue).toBeFalsy();
  });

  it('should return true if the element is disabled by property', async () => {
    const isDisabledValue = await isDisabled(page as never, '#disabledButton2');
    expect(isDisabledValue).toBeTruthy();
  });

  it('should return true if the element is disabled by class', async () => {
    const isDisabledValue = await isDisabled(page as never, '#disabledButton');
    expect(isDisabledValue).toBeTruthy();
  });

  it('should return true if the element is disabled by custom attribute', async () => {
    const isDisabledValue = await isDisabled(
      page as never,
      '#disabledButton1',
      'data-disabled',
    );
    expect(isDisabledValue).toBeTruthy();
  });
});
