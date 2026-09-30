import { Routes } from '@angular/router';
import { LegalNoticeComponent } from './shared/components/header/legal-notice/legal-notice.component';
import { PrivacyPolicyComponent } from './shared/components/header/privacy-policy/privacy-policy.component';
import { ContactComponent } from './main-content/contact/contact.component';
import { HelpComponent } from './shared/components/header/help/help.component';
import { SummaryComponent } from './main-content/summary/summary.component';
import { AddTaskComponent } from './main-content/add-task/add-task.component';
import { BoardComponent } from './main-content/board/board.component';
import { TaskComponent } from './main-content/task/task.component';
import { LoginComponent } from './landingpage/login/login.component';
import { SignupComponent } from './landingpage/signup/signup.component';
import { authGuard } from './guards/auth.guard';

/**
 * @fileoverview
 * Application routes configuration for Angular Router.
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
    path: 'summary', component: SummaryComponent, canActivate: [authGuard],
  },

  /**
   * Route for the add-task component.
   */
  {
    path: 'add-task', component: AddTaskComponent, canActivate: [authGuard],
  },

  /**
   * Route for the board component.
   */
  {
    path: 'board', component: BoardComponent, canActivate: [authGuard],
  },

  /**
   * Route for the contact component.
   */
  {
    path: 'contact', component: ContactComponent, canActivate: [authGuard],
  },

  /**
   * Route for the help component.
   */
  { 
    path: 'help', component: HelpComponent, canActivate: [authGuard],
  },

  /**
   * Route for the privacy policy component.
   */
  {
    path: 'privacy', component: PrivacyPolicyComponent,
  },

  /**
   * Route for the legal notice component.
   */
  {
    path: 'legal-notice', component: LegalNoticeComponent,
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
