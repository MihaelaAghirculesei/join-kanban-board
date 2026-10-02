import { EnvironmentProviders, Provider } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { disableNetwork, getFirestore } from 'firebase/firestore';
import { AUTH, FIREBASE_APP, FIRESTORE } from '../app/firebase';

/**
 * Shared providers for unit tests.
 * Uses an isolated "demo-" Firebase project with networking disabled,
 * so specs never touch a real backend.
 */
export const testProviders: (Provider | EnvironmentProviders)[] = [
  provideRouter([]),
  provideNoopAnimations(),
  {
    provide: FIREBASE_APP,
    useFactory: () => initializeApp({ projectId: 'demo-join', apiKey: 'demo-api-key', appId: 'demo-app-id' }),
  },
  { provide: AUTH, useFactory: (app: FirebaseApp) => getAuth(app), deps: [FIREBASE_APP] },
  {
    provide: FIRESTORE,
    useFactory: (app: FirebaseApp) => {
      const firestore = getFirestore(app);
      disableNetwork(firestore);
      return firestore;
    },
    deps: [FIREBASE_APP],
  },
];
