import { BoundingBox } from '@wix/sled-test-runner';

export function getBottom(boundingBox: BoundingBox) {
  return boundingBox.y + boundingBox.height;
}
