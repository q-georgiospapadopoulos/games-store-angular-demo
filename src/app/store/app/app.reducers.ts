import { createReducer, on } from '@ngrx/store';
import * as FieldsActions from './app.actions';
import { FieldsState } from './app.models';

export const initialState: FieldsState = {
  fieldCount: 0,
  fields: [],
  loading: false,
  error: null,
};

export const appReducer = createReducer(
  initialState,
  on(FieldsActions.loadFields, (s) => ({ ...s, loading: true, error: null })),
  on(FieldsActions.loadFieldsSuccess, (s, { fields }) => ({
    ...s,
    fieldCount: fields.length,
    fields,
    loading: false,
    error: null,
  })),
  on(FieldsActions.loadFieldsFailure, (s, { error }) => ({
    ...s,
    loading: false,
    error,
  }))
);
