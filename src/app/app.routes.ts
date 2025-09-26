import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ResultsComponent } from './pages/results/results.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'results',
    component: ResultsComponent,
    title: 'Results',
    children: [
      {
        path: 'dialog',
        loadComponent: () =>
          import('./pages/game-dialog/game-dialog.component').then(
            (m) => m.GameDialogComponent
          ),
      },
    ],
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    title: 'Checkout',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
