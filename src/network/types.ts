import { HTTPRequest } from 'puppeteer';

export const DefaultRequestTypes = [
  'fetch',
  'xhr',
  'document',
  'javascript',
  'script',
];

export interface ResolvableRequest extends HTTPRequest {
  isResolved: boolean;
  resolver: () => void;
}
