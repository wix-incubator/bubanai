import { getFrameByName } from '../../../src';

describe('Frame Search: getFrameByName()', () => {
  const baseUrl = 'http://the-internet.herokuapp.com';

  beforeAll(async () => {
    await page.goto(`${baseUrl}/nested_frames`);
  });

  it('should get frame by its name', async () => {
    const frame = await getFrameByName(page as never, 'frame-right');
    expect(frame.url()).toBe(`${baseUrl}/frame_right`);
  });

  it('should throw an error if the frame is absent on the page', async () => {
    let isTimeout = false;

    try {
      await getFrameByName(page as never, 'frame-is-absent', {
        timeoutMs: 1000,
      });
    } catch (e) {
      isTimeout = true;
    }
    expect(isTimeout).toBe(true);
  });
});
