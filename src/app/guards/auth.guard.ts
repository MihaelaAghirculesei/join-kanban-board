import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AUTH, authState } from '../firebase';
import { map, take } from 'rxjs';

/**
 * Allows navigation only for signed-in users (including the guest account).
 * Waits for Firebase to restore the session before deciding, otherwise
 * redirects to the login page.
 */
export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  return authState(inject(AUTH)).pipe(
    take(1),
    map((user) => (user ? true : router.createUrlTree(['/login'])))
  );
};
