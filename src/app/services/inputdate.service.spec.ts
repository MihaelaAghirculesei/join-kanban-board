import { TestBed } from '@angular/core/testing';
import { testProviders } from '../../testing/test-providers';

import { InputdateService } from './inputdate.service';

describe('InputdateService', () => {
  let service: InputdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: testProviders });
    service = TestBed.inject(InputdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
