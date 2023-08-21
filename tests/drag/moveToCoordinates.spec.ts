import { moveToCoordinates } from '../../src';
describe('Drag: moveToCoordinates()', () => {
  it('should check not continuous move to coordinates with one step', async () => {
    const moveMock = jest
      .spyOn(page.mouse, 'move')
      .mockImplementation(async () => {});

    const from = { x: 0, y: 0 };
    const to = { x: 100, y: 100 };

    await moveToCoordinates(page as never, from, to);

    expect(moveMock).toHaveBeenCalledTimes(2);
    expect(moveMock).toHaveBeenNthCalledWith(1, to.x, from.y, { steps: 1 });
    expect(moveMock).toHaveBeenNthCalledWith(2, to.x, to.y, { steps: 1 });
    moveMock.mockRestore();
  });

  it('should check continuous move to coordinates in several steps', async () => {
    const moveMock = jest
      .spyOn(page.mouse, 'move')
      .mockImplementation(async () => {});

    const from = { x: 0, y: 0 };
    const to = { x: 100, y: 100 };
    const continuous = true;
    const steps = 10;

    await moveToCoordinates(page as never, from, to, continuous, steps);

    expect(moveMock).toHaveBeenCalledTimes(2);
    expect(moveMock).toHaveBeenNthCalledWith(1, to.x, from.y, { steps: steps });
    expect(moveMock).toHaveBeenNthCalledWith(2, to.x, to.y, { steps: steps });
    moveMock.mockRestore();
  });
});
