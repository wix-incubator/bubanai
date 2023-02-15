import { ACTION_POLL_INTERVAL, ACTION_TIMEOUT } from './settings';

export interface WaitOptions {
  timeoutMs?: number;
  pollIntervalMs?: number;
}

export const DefaultWaitOptions = {
  timeoutMs: ACTION_TIMEOUT,
  pollIntervalMs: ACTION_POLL_INTERVAL,
};
