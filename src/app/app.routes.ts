import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '', redirectTo: 'summary', pathMatch: 'full',
  },
  {
    path: 'summary', loadComponent: () => import('./main-content/contact/summary/summary.component').then((m) => m.SummaryComponent),
  },
  {
    path: 'add-task',loadComponent: () => import('./main-content/contact/add-task/add-task.component').then( (m) => m.AddTaskComponent),
  },
  {
    path: 'board', loadComponent: () => import('./main-content/contact/board/board.component').then((m) => m.BoardComponent),
  },
  {
    path: 'contacts',loadComponent: () => import('./main-content/contact/contacts/contacts.component').then((m) => m.ContactsComponent),
  },
//   {
//     path: 'privacy-policy', loadComponent: () => import('./pages/privacy-policy/privacy-policy.component').then((m) => m.PrivacyPolicyComponent),
//   },
//   {
//     path: 'legal-notice',loadComponent: () => import('./pages/legal-notice/legal-notice.component').then((m) => m.LegalNoticeComponent),
//   },
];
