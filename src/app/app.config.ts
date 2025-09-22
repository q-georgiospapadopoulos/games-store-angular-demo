import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { searchReducer } from './store/search/search.reducers';
import { appReducer } from './store/app/app.reducers';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { SearchEffects } from './store/search/search.effects';
import { FieldsEffects } from './store/app/app.effects';
import {
  getPreloadedState,
  localStorageMetaReducer,
} from './store/meta-reducers/localstorage.metareducer';
import { AppState } from './store/app.state';

const preloadedState = getPreloadedState();

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(),
    provideEffects([SearchEffects, FieldsEffects]),
    provideStore<AppState>(
      { search: searchReducer, fields: appReducer },
      {
        metaReducers: [localStorageMetaReducer],
        initialState: preloadedState,
      }
    ),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
