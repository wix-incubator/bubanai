import {
  KeyboardDriver,
  waitForValueToStopChanging,
  getComputedStyle,
  propertyAsRGB,
} from '../../src';

describe('KeyboardDriver: execute()', () => {
  beforeEach(async () => {
    await page.setContent(`
      <html>
        <head>
          <title>Keyboard Execute Example</title>
          <style>
            .box {
              width: 200px;
              height: 200px;
              background-color: blue;
              transition: background-color 0.3s ease-in-out;
            }
            .box.executed {
              background-color: yellow;
            }
          </style>
        </head>
        <body>
          <div class="box"></div>

          <script>
            const boxElement = document.querySelector('.box');
            let isKey1Held = false;
            let isKey2Held = false;

            window.addEventListener('keydown', handleKeyDown);

            function handleKeyDown(event) {
              if (event.key === 'Shift') {
                isKey1Held = true;
              }
              if (event.key === 'ArrowRight') {
                isKey2Held = true;
              }

              if (isKey1Held && isKey2Held) {
                boxElement.classList.add('executed');
              }
            }
          </script>
        </body>
      </html>
    `);
  });

  it('should hold the specified keys, execute the action, and release the keys', async () => {
    const keyboardDriver = new KeyboardDriver(page as never);
    const keys = ['Shift', 'ArrowRight'];
    const getBoxElementColor = () =>
      getComputedStyle('background-color', page as never, '.box').then(
        propertyAsRGB,
      );

    const boxDefaultColor = await getBoxElementColor();
    expect(boxDefaultColor).toEqual({ r: 0, g: 0, b: 255 });

    await keyboardDriver.execute(keys);

    await waitForValueToStopChanging(getBoxElementColor);
    expect(await getBoxElementColor()).toEqual({ r: 255, g: 255, b: 0 });
  });
});
