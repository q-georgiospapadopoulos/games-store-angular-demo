import { ActionReducer } from '@ngrx/store';
import { initialState } from '../app/app.reducers';
import { FieldsState } from '../app/app.models';

export function localStorageMetaReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return (state, action) => {
    const nextState = reducer(state, action);

    if (typeof window !== 'undefined') {
      try {
        const searchState = nextState?.search;

        if (searchState) {
          localStorage.setItem('search', JSON.stringify(searchState));
        }
      } catch (e) {
        console.warn('Error saving state to localStorage', e);
      }
    }

    return nextState;
  };
}

export function getPreloadedState() {
  if (typeof window !== 'undefined') {
    const storedSearch = localStorage.getItem('search');
    const storedFields = localStorage.getItem('fields');

    const preloadedState: any = {};

    if (storedSearch) {
      try {
        preloadedState.search = JSON.parse(storedSearch);
      } catch {
        // Ignore parsing errors
      }
    }

    if (storedFields) {
      try {
        preloadedState.fields = JSON.parse(storedFields);
      } catch {
        preloadedState.fields = initialState as FieldsState;
      }
    } else {
      preloadedState.fields = initialState as FieldsState;
    }

    return preloadedState;
  }
  return {
    fields: initialState as FieldsState,
  };
}
