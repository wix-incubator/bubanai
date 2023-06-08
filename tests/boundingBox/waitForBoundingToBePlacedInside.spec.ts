import { TestError, wait, waitForBoundingToBePlacedInside } from '../../src';
import { wrapError } from '../utils';
import { BoundingBox } from 'puppeteer-core';

describe('Bounding Box: waitForBoundingToBePlacedInside()', () => {
  const container: BoundingBox = { x: 10, y: 10, width: 100, height: 100 };

  it('resolves if inside element is placed in container after wait', async () => {
    let insideElement: BoundingBox = { x: 5, y: 20, width: 50, height: 50 };
    const actionTimeout = 1100;
    const pollIntervalMs = 500;
    const changeVarFunc = async () => {
      await wait(actionTimeout);
      insideElement = { x: 20, y: 20, width: 50, height: 50 };
      return insideElement;
    };
    const returnBoundingFunc = jest.fn(() => Promise.resolve(insideElement));
    changeVarFunc();
    await expect(
      waitForBoundingToBePlacedInside(returnBoundingFunc, container, {
        pollIntervalMs,
      }),
    ).resolves.toBeUndefined();
    expect(returnBoundingFunc).toHaveBeenCalledTimes(
      Math.floor(actionTimeout / pollIntervalMs) + 2,
    );
  });

  it('rejects if inside element is not placed inside container after wait', async () => {
    const insideElement: BoundingBox = { x: 5, y: 20, width: 50, height: 50 };
    const returnBoundingFunc = jest.fn(async () => insideElement);
    const timeoutMs = 1100;
    const pollIntervalMs = 500;
    await expect(
      waitForBoundingToBePlacedInside(returnBoundingFunc, container, {
        timeoutMs,
        pollIntervalMs,
      }),
    ).rejects.toThrowError(
      wrapError(
        await TestError.BoundingIsNotPlacedInside(
          returnBoundingFunc,
          container,
        ),
        returnBoundingFunc,
      ),
    );

    //1 additional call inside test error
    expect(returnBoundingFunc).toHaveBeenCalledTimes(
      Math.floor(timeoutMs / pollIntervalMs) + 3,
    );
  });
});
