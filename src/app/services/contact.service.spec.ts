import { TestBed } from '@angular/core/testing';
import { testProviders } from '../../testing/test-providers';

import { ContactService } from './contact.service';

describe('ContactService', () => {
  let service: ContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: testProviders });
    service = TestBed.inject(ContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
