import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FieldsState } from './app.models';

export const selectFieldsState = createFeatureSelector<FieldsState>('fields');

export const selectFields = createSelector(selectFieldsState, (s) => s.fields);
export const selectFieldsLoading = createSelector(
  selectFieldsState,
  (s) => s.loading
);
export const selectFieldsError = createSelector(
  selectFieldsState,
  (s) => s.error
);
