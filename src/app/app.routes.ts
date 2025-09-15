import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ResultsComponent } from './pages/results/results.component';
import { DetailsComponent } from './pages/details/details.component';
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
  },
  {
    path: 'details/:gameId',
    component: DetailsComponent,
    title: 'Details',
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
