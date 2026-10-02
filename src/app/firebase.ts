import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';
import { FirebaseApp, FirebaseAppSettings, FirebaseOptions, initializeApp } from 'firebase/app';
import { Auth, getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { Observable } from 'rxjs';

/** The initialized Firebase app. */
export const FIREBASE_APP = new InjectionToken<FirebaseApp>('FIREBASE_APP');

/** Firebase Authentication instance of the app. */
export const AUTH = new InjectionToken<Auth>('AUTH');

/** Cloud Firestore instance of the app. */
export const FIRESTORE = new InjectionToken<Firestore>('FIRESTORE');

/**
 * Registers the Firebase app, Authentication and Firestore for dependency injection.
 * @param options - Firebase web configuration of the project
 * @param settings - optional app settings (e.g. automaticDataCollectionEnabled)
 */
export function provideFirebase(options: FirebaseOptions, settings?: FirebaseAppSettings): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: FIREBASE_APP, useFactory: () => initializeApp(options, settings) },
    { provide: AUTH, useFactory: (app: FirebaseApp) => getAuth(app), deps: [FIREBASE_APP] },
    { provide: FIRESTORE, useFactory: (app: FirebaseApp) => getFirestore(app), deps: [FIREBASE_APP] },
  ]);
}

/**
 * Emits the signed-in user (or null) whenever the authentication state changes.
 * The first value arrives once Firebase has restored a persisted session.
 * @param auth - Firebase Authentication instance
 */
export function authState(auth: Auth): Observable<User | null> {
  return new Observable<User | null>((subscriber) =>
    onAuthStateChanged(
      auth,
      (user) => subscriber.next(user),
      (error) => subscriber.error(error)
    )
  );
}
