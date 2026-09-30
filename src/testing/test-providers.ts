import { EnvironmentProviders, Provider } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { disableNetwork, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';

/**
 * Shared providers for unit tests.
 * Uses an isolated "demo-" Firebase project with networking disabled,
 * so specs never touch a real backend.
 */
export const testProviders: (Provider | EnvironmentProviders)[] = [
  provideRouter([]),
  provideNoopAnimations(),
  provideFirebaseApp(() =>
    initializeApp({ projectId: 'demo-join', apiKey: 'demo-api-key', appId: 'demo-app-id' })
  ),
  provideFirestore(() => {
    const firestore = getFirestore();
    disableNetwork(firestore);
    return firestore;
  }),
  provideAuth(() => getAuth()),
];
