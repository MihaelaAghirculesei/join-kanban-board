import { TestBed } from '@angular/core/testing';
import { testProviders } from '../../testing/test-providers';

import { FeedbackServiceService } from './feedback.service';

describe('FeedbackServiceService', () => {
  let service: FeedbackServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: testProviders });
    service = TestBed.inject(FeedbackServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
