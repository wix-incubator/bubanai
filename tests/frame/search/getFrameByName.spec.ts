import { getFrameByName } from '../../../src/frame/search/getFrameByName';

describe('Frame Search: getFrameByName()', () => {
  const baseUrl = 'http://the-internet.herokuapp.com';

  beforeAll(async () => {
    await page.goto(`${baseUrl}/nested_frames`);
  });

  it('should get frame by its name', async () => {
    const frame = await getFrameByName(page, 'frame-right');
    expect(frame.url()).toBe(`${baseUrl}/frame_right`);
  });

  it('should throw an error if the frame is absent on the page', async () => {
    let isTimeout = false;

    try {
      await getFrameByName(page, 'frame-is-absent', {
        timeout: 2,
      });
    } catch (e) {
      isTimeout = true;
    }
    expect(isTimeout).toBe(true);
  });
});
