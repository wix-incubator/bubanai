import { getFrameBySrc } from '../../../src/frame/search/getFrameBySrc';

describe('Frame Search: getFrameBySrc()', () => {
  const baseUrl = 'http://the-internet.herokuapp.com';

  beforeAll(async () => {
    await page.goto(`${baseUrl}/nested_frames`);
  });

  it('should get frame by part of its URL', async () => {
    const frame = await getFrameBySrc(page, 'frame_middle');
    expect(frame.name()).toBe('frame-middle');
  });

  it('should get frame by the whole URL value', async () => {
    const frame = await getFrameBySrc(page, `${baseUrl}/frame_middle`, true);
    expect(frame.name()).toBe('frame-middle');
  });

  it('should not find the frame if the URL does not strictly match', async () => {
    let isTimeout = false;

    try {
      await getFrameBySrc(page, `${baseUrl}`, true, { timeout: 2 });
    } catch (e) {
      isTimeout = true;
    }
    expect(isTimeout).toBe(true);
  });
});
