import { includes } from 'lodash';
import { Page, HTTPRequest } from 'puppeteer-core';
import { wait } from '../waitFor';
import { ResolvableRequest } from './types';

function isResolvable(request: HTTPRequest): request is ResolvableRequest {
  return 'resolver' in request;
}

export class RequestWaiter {
  private readonly pendingRequests = new Set<HTTPRequest>();
  private readonly finishedWithSuccess = new Set<HTTPRequest>();
  private readonly finishedWithErrors = new Set<HTTPRequest>();
  private readonly promises: Promise<void>[] = [];

  constructor(private page: Page, private resourceType: string[]) {
    this.onRequest = this.onRequest.bind(this);
    this.onRequestFailed = this.onRequestFailed.bind(this);
    this.onRequestFinished = this.onRequestFinished.bind(this);

    page.on('request', this.onRequest);
    page.on('requestfailed', this.onRequestFailed);
    page.on('requestfinished', this.onRequestFinished);
  }

  private onRequest(request: HTTPRequest) {
    if (includes(this.resourceType, request.resourceType())) {
      const resolvableRequest = request as ResolvableRequest;
      this.pendingRequests.add(resolvableRequest);
      this.promises.push(
        new Promise((resolve) => {
          resolvableRequest.resolver = resolve;
        }),
      );
    }
  }

  private onRequestFinished(request: HTTPRequest) {
    if (includes(this.resourceType, request.resourceType())) {
      this.pendingRequests.delete(request);
      this.finishedWithSuccess.add(request);
      if (isResolvable(request) && !request.isResolved) {
        request.isResolved = true;
        request.resolver();
      }
    }
  }

  private onRequestFailed(request: HTTPRequest) {
    if (includes(this.resourceType, request.resourceType())) {
      this.pendingRequests.delete(request);
      this.finishedWithErrors.add(request);
      if (isResolvable(request) && !request.isResolved) {
        request.isResolved = true;
        request.resolver();
      }
    }
  }

  async waitForAllRequestsToBeFinished() {
    if (this.pendingRequestCount() === 0) {
      this.removeListeners();
      return;
    }
    while (this.pendingRequestCount()) {
      await Promise.all(this.promises);
      await wait(500);
    }
    this.removeListeners();
  }

  private pendingRequestCount() {
    return this.pendingRequests.size;
  }

  private removeListeners() {
    this.page.off('request', this.onRequest);
    this.page.off('requestfailed', this.onRequestFailed);
    this.page.off('requestfinished', this.onRequestFinished);
  }
}
