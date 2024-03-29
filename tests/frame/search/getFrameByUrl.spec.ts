import { getFrameByUrl } from '../../../src';

describe('Frame Search: getFrameByUrl()', () => {
  const baseUrl = 'http://the-internet.herokuapp.com';

  beforeAll(async () => {
    await page.goto(`${baseUrl}/nested_frames`);
  });

  it('should get frame by part of its URL', async () => {
    const frame = await getFrameByUrl(page as never, 'frame_middle');
    expect(frame.name()).toBe('frame-middle');
  });

  it('should get frame by the whole URL value', async () => {
    const frame = await getFrameByUrl(
      page as never,
      `${baseUrl}/frame_middle`,
      true,
    );
    expect(frame.name()).toBe('frame-middle');
  });

  it('should not find the frame if the URL does not strictly match', async () => {
    let isTimeout = false;

    try {
      await getFrameByUrl(page as never, `${baseUrl}`, true, {
        timeoutMs: 1000,
      });
    } catch (e) {
      isTimeout = true;
    }
    expect(isTimeout).toBe(true);
  });
});
