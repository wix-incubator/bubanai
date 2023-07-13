import {
  KeyboardDriver,
  waitForValueToStopChanging,
  getComputedStyle,
  propertyAsRGB,
} from '../../src';

describe('KeyboardDriver: releaseAll()', () => {
  beforeEach(async () => {
    await page.setContent(`
                <html>
                <head>
                  <title>Keyboard Holding Example</title>
                  <style>
                    .box {
                      width: 200px;
                      height: 200px;
                      background-color: blue;
                      transition: background-color 0.3s ease-in-out;
                    }
                    .box.held {
                      background-color: red;
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
                    window.addEventListener('keyup', handleKeyUp);

                    function handleKeyDown(event) {
                      if (event.key === 'Shift') {
                        isKey1Held = true;
                      }
                      if (event.key === 'ArrowRight') {
                        isKey2Held = true;
                      }

                      if (isKey1Held && isKey2Held) {
                        boxElement.classList.add('held');
                      }
                    }

                    function handleKeyUp(event) {
                      if (event.key === 'Shift') {
                        isKey1Held = false;
                      }
                      if (event.key === 'ArrowRight') {
                        isKey2Held = false;
                      }

                      if (!isKey1Held || !isKey2Held) {
                        boxElement.classList.remove('held');
                      }
                    }
                  </script>
                </body>
                </html>
`);
  });

  it('should release all keys', async () => {
    const keyboardDriver = new KeyboardDriver(page as never);
    const keys = ['Shift', 'ArrowRight'];
    const getElementColor = () =>
      getComputedStyle('background-color', page as never, '.box').then((p) =>
        propertyAsRGB(p),
      );
    const defaultColor = await getElementColor();
    await keyboardDriver.hold(keys);

    await waitForValueToStopChanging(getElementColor);
    expect(await getElementColor()).not.toEqual(defaultColor);

    await keyboardDriver.releaseAll();
    await waitForValueToStopChanging(getElementColor);
    expect(await getElementColor()).toEqual(defaultColor);
  });
});
