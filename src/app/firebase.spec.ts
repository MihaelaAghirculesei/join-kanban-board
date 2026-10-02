import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { testProviders } from '../testing/test-providers';

import { AUTH, FIRESTORE, authState } from './firebase';

describe('firebase providers', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: testProviders });
  });

  it('should provide Auth and Firestore instances of the same app', () => {
    const auth = TestBed.inject(AUTH);
    const firestore = TestBed.inject(FIRESTORE);
    expect(auth.app).toBe(firestore.app);
  });

  it('authState should emit null when nobody is signed in', async () => {
    const user = await firstValueFrom(authState(TestBed.inject(AUTH)));
    expect(user).toBeNull();
  });
});
