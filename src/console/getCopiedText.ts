import { DocumentContext } from '../page';

export async function getCopiedText(context: DocumentContext): Promise<string> {
  return context.evaluate(() => navigator.clipboard.readText());
}
