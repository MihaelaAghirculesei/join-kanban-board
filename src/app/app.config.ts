// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding() // Routen-Params → automatisch als Inputs
    ),
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyBC58nP_y_kR0rl7_n-wOCKLhaAjsTHQlM',
        authDomain: 'join-kanban-mihaela.firebaseapp.com',
        projectId: 'join-kanban-mihaela',
        storageBucket: 'join-kanban-mihaela.firebasestorage.app',
        messagingSenderId: '4712777391',
        appId: '1:4712777391:web:903d0e427ce2032587f65a',
      })
    ),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideAnimationsAsync(),
  ],
};
