import { ElementHandle } from '@wix/sled-test-runner';
import { getBoundingBox } from './getBoundingBox';

export async function getX(element: ElementHandle) {
  return getBoundingBox(element).then(({ x }) => x);
}
