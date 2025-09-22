import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { ActionReducer, MetaReducer, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { searchReducer } from './store/search/search.reducers';
import { appReducer } from './store/app/app.reducers';
import { localStorageSync } from 'ngrx-store-localstorage';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { SearchEffects } from './store/search/search.effects';
import { FieldsEffects } from './store/app/app.effects';

function sessionSyncMetaReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return (state, action) => {
    // Avoid SSR issues: window is undefined on the server
    const storage = typeof window !== 'undefined' ? sessionStorage : undefined;
    const sync = localStorageSync({
      keys: ['search', 'fields'], // persist only Search slice
      rehydrate: true,
      storage,
    })(reducer);
    return sync(state, action);
  };
}
const metaReducers: MetaReducer[] = [sessionSyncMetaReducer];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(),
    provideEffects([SearchEffects, FieldsEffects]),
    provideStore(
      { search: searchReducer, fields: appReducer },
      { metaReducers }
    ),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
