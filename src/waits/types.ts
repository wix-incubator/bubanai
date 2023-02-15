import { ACTION_ATTEMPTS, ACTION_POLL_INTERVAL } from '../settings';

export interface WaitWithAttemptsOptions {
  attempts: number;
  interval: number;
  assertCondition?: any;
}

export const DefaultWaitOptions = {
  attempts: ACTION_ATTEMPTS,
  interval: ACTION_POLL_INTERVAL,
  assertCondition: undefined,
};
