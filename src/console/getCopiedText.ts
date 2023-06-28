import type { DocumentContext } from '../page';

/**
 * Returns copied text from clipboard.
 * Needs clipboard permissions to the page.
 * (for more details https://github.com/chromium/chromium/commit/f66617497ff714042afe98ce19a7cb611e08c07d)
 * @param context Page or Frame
 *
 * @category Console
 */
export async function getCopiedText(context: DocumentContext): Promise<string> {
  return context.evaluate(() => navigator.clipboard.readText());
}
