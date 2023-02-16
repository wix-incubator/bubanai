import { ACTION_POLL_INTERVAL, ACTION_TIMEOUT } from './settings';

export type ActionReturnType =
  | Promise<boolean | null | undefined>
  | boolean
  | null
  | undefined;
export interface WaitOptions {
  timeoutMs?: number;
  pollIntervalMs?: number;
}

export const DefaultWaitOptions = {
  timeoutMs: ACTION_TIMEOUT,
  pollIntervalMs: ACTION_POLL_INTERVAL,
};
