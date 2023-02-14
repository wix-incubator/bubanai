import type { DocumentContext } from '../page';

export function isFrame(context: DocumentContext) {
  return 'name' in context;
}
