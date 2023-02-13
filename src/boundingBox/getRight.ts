import { BoundingBox } from '@wix/sled-test-runner';

export function getRight(boundingBox: BoundingBox) {
  return boundingBox.x + boundingBox.width;
}
