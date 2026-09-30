import { Routes } from '@angular/router';
import { LoginComponent } from './landingpage/login/login.component';
import { SignupComponent } from './landingpage/signup/signup.component';
import { authGuard } from './guards/auth.guard';

/**
 * @fileoverview
 * Application routes configuration for Angular Router.
 * Landing pages are loaded eagerly, all other pages are lazy-loaded.
 */
export const routes: Routes = [
  /**
   * Route for the login component (default path).
   */
  {
    path: '', component: LoginComponent,
  },

  /**
   * Route for the signup component.
   */
  {
    path: 'sign-up', component: SignupComponent,
  },

  /**
   * Route for the summary component.
   */
  {
    path: 'summary',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./main-content/summary/summary.component').then((m) => m.SummaryComponent),
  },

  /**
   * Route for the add-task component.
   */
  {
    path: 'add-task',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./main-content/add-task/add-task.component').then((m) => m.AddTaskComponent),
  },

  /**
   * Route for the board component.
   */
  {
    path: 'board',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./main-content/board/board.component').then((m) => m.BoardComponent),
  },

  /**
   * Route for the contact component.
   */
  {
    path: 'contact',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./main-content/contact/contact.component').then((m) => m.ContactComponent),
  },

  /**
   * Route for the help component.
   */
  {
    path: 'help',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./shared/components/header/help/help.component').then((m) => m.HelpComponent),
  },

  /**
   * Route for the privacy policy component.
   */
  {
    path: 'privacy',
    loadComponent: () =>
      import('./shared/components/header/privacy-policy/privacy-policy.component').then(
        (m) => m.PrivacyPolicyComponent
      ),
  },

  /**
   * Route for the legal notice component.
   */
  {
    path: 'legal-notice',
    loadComponent: () =>
      import('./shared/components/header/legal-notice/legal-notice.component').then(
        (m) => m.LegalNoticeComponent
      ),
  },

  /**
   * Route for the login component (explicit path).
   */
  {
    path: 'login', component: LoginComponent,
  },

  /**
   * Unknown URLs fall back to the login page.
   */
  {
    path: '**', redirectTo: '',
  }
];
