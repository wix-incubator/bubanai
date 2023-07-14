import { hoverAtOffset, getElement, getComputedStyle } from '../../../src';

describe('Element Actions: hoverAtOffset()', () => {
  let element;
  let buttonColorStyleBeforeHover;
  let buttonBackgroundColorStyleBeforeHover;

  beforeEach(async () => {
    await page.reload();
    await page.setContent(`
                         <html lang="en">
                          <head>
                            <title>Test Page</title>
                            <style>
                              #container {
                                position: absolute;
                                width: 200px;
                                height: 200px;
                                background-color: #f0f0f0;
                                padding: 10px;
                              }
                              #element {
                                position: absolute;
                                top: 50px;
                                left: 250px;
                                background-color: #ffffff;
                                padding: 10px;
                              }
                              #container:hover #element {
                                color: #ff0000;
                              }
                              #element:hover {
                                background-color: #00ff00;
                              }
                            </style>
                          </head>
                          <body>
                            <div id="container">
                              <button id="element">Hover Me</button>
                            </div>
                          </body>
                        </html>
    `);

    element = await getElement(page as never, '#element');
    buttonColorStyleBeforeHover = await getComputedStyle(
      'color',
      page as never,
      element,
    );

    buttonBackgroundColorStyleBeforeHover = await getComputedStyle(
      'background-color',
      page as never,
      element,
    );
  });

  it('should hover on offsets of element', async () => {
    expect(buttonColorStyleBeforeHover).not.toBe('rgb(255, 0, 0)');

    await hoverAtOffset(page as never, element, {
      offsetX: -70,
      offsetY: 0,
    });

    const buttonStyleAfterHover = await getComputedStyle(
      'color',
      page as never,
      element,
    );
    expect(buttonStyleAfterHover).toBe('rgb(255, 0, 0)');
  });

  it('should hover element if offsets are not defined', async () => {
    expect(buttonBackgroundColorStyleBeforeHover).toBe('rgb(255, 255, 255)');

    await hoverAtOffset(page as never, element);

    const buttonStyleAfterHover = await getComputedStyle(
      'background-color',
      page as never,
      element,
    );
    expect(buttonStyleAfterHover).toBe('rgb(0, 255, 0)');
  });
});
