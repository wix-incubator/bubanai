import {
  KeyboardDriver,
  waitForValueToStopChanging,
  getComputedStyle,
  propertyAsRGB,
} from '../../src';

describe('KeyboardDriver: holdAndExecute()', () => {
  beforeEach(async () => {
    await page.setContent(`
          <html lang="en">
            <head>
              <title>Button Click during Hold Example</title>
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
                .button {
                  padding: 10px;
                  background-color: green;
                  color: white;
                  border: none;
                  cursor: pointer;
                  transition: background-color 0.3s ease-in-out;
                }
                .button.clicked {
                  background-color: yellow;
                }
              </style>
            </head>
            <body>
              <div class="box"></div>
              <button class="button">Click Me</button>

              <script>
                const boxElement = document.querySelector('.box');
                const buttonElement = document.querySelector('.button');
                let isKey1Held = false;
                let isKey2Held = false;
                let isButtonClicked = false;

                window.addEventListener('keydown', handleKeyDown);
                window.addEventListener('keyup', handleKeyUp);
                buttonElement.addEventListener('click', handleButtonClick);

                function handleKeyDown(event) {
                  if (event.key === 'Shift') {
                    isKey1Held = true;
                  }
                  if (event.key === 'ArrowRight') {
                    isKey2Held = true;
                  }

                  if (isKey1Held && isKey2Held && isButtonClicked) {
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

                function handleButtonClick() {
                  if (isKey1Held && isKey2Held) {
                    buttonElement.classList.add('clicked');
                    isButtonClicked = true;
                  }
                }
              </script>
            </body>
          </html>

    `);
  });

  it('should hold the specified keys, perform the action, and release the keys', async () => {
    const keyboardDriver = new KeyboardDriver(page as never);
    const keys = ['Shift', 'ArrowRight'];
    const getBoxElementColor = () =>
      getComputedStyle('background-color', page as never, '.box').then(
        propertyAsRGB,
      );
    const getButtonElementColor = () =>
      getComputedStyle('background-color', page as never, '.button').then(
        propertyAsRGB,
      );

    const boxDefaultColor = await getBoxElementColor();
    const buttonDefaultColor = await getButtonElementColor();
    expect(boxDefaultColor).toEqual({ r: 0, g: 0, b: 255 });
    expect(buttonDefaultColor).toEqual({ r: 0, g: 128, b: 0 });

    await keyboardDriver.holdAndExecute(keys, async () => page.click('button'));

    await waitForValueToStopChanging(getBoxElementColor);
    expect(await getBoxElementColor()).toEqual({ r: 0, g: 0, b: 255 });
    expect(await getButtonElementColor()).toEqual({ r: 255, g: 255, b: 0 });
  });
});
