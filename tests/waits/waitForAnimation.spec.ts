import { getBoundingBox, waitForAnimation } from '../../src';
import { performance } from 'perf_hooks';

describe('Waits: waitForAnimation()', () => {
  beforeAll(async () => {
    await page.setContent(`<html>
<head>
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.20/lodash.min.js"></script>
<style>
div {
  width: 100px;
  height: 100px;
  background-color: red;
  animation-name: example;
  animation-duration: 2.5s;
  opacity: 0.5;
}

button {
  width: 100px;
  height: 100px;
  background-color: red;
  animation-name: exampleOne;
  animation-duration: 15s;
}

@keyframes example {
  from {width: 100px; height: 100px; opacity: 0.5}
  to {width: 200px; height: 200px; opacity: 1 }
}

@keyframes exampleOne {
  from {width: 100px; height: 100px;}
  to {width: 200px; height: 200px;}
}
</style>
</head>
<body>

<h1>CSS Animation</h1>

<div id="animatedElement"></div>
<button id="elementWithLongAnimation"></button>

</body>
</html>`);
  });

  it('should wait for element animation to be finished', async () => {
    const startTime = performance.now();
    const targetElement = await waitForAnimation(
      page as never,
      '#animatedElement',
    );
    const endTime = performance.now();
    const elementBounding = await getBoundingBox(targetElement);
    const animationTimeout = 2500;
    expect(endTime - startTime).toBeGreaterThanOrEqual(animationTimeout);
    expect(endTime - startTime).toBeLessThanOrEqual(animationTimeout * 2);
    expect(elementBounding.width).toEqual(100);
    expect(elementBounding.height).toEqual(100);
  });

  it('should exit when animation is not happened within timeframes', async () => {
    const startTime = performance.now();
    await waitForAnimation(page as never, 'h1');
    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThanOrEqual(1500);
  });

  it('should exit after shutdown timeout is passed', async () => {
    const startTime = performance.now();
    const killTimeout = 2000;
    const targetElement = await waitForAnimation(
      page as never,
      '#elementWithLongAnimation',
      {
        killTimeout,
      },
    );
    const endTime = performance.now();
    const elementBounding = await getBoundingBox(targetElement);
    expect(endTime - startTime).toBeLessThanOrEqual(killTimeout + 1000);
    expect(elementBounding.width).not.toEqual(100);
  });
});
