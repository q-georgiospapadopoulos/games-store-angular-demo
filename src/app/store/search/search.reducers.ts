import { createReducer, on } from '@ngrx/store';
import * as SearchActions from './search.actions';
import { SearchState, SearchOperator } from './search.models';

export const initialState: SearchState = {
  conditions: [],
  logicalOperator: [],
  results: [],
  loading: false,
  error: null,
};

export const searchReducer = createReducer(
  initialState,

  on(SearchActions.initWithOneRow, (state) => ({
    ...state,
    logicalOperator: [null],
    conditions: state.conditions.length
      ? state.conditions
      : [{ field: '', operator: 'is' as SearchOperator, keyword: '' }],
  })),

  on(SearchActions.addRow, (state) => ({
    ...state,
    logicalOperator: [...state.logicalOperator, null],
    conditions: [
      ...state.conditions,
      { field: '', operator: 'is' as SearchOperator, keyword: '' },
    ],
  })),

  on(SearchActions.removeRow, (state, { index }) => ({
    ...state,
    conditions: state.conditions.filter((_, i) => i !== index),
    logicalOperator: state.logicalOperator.filter((_, i) => i !== index - 1),
  })),

  on(SearchActions.setField, (state, { index, field }) => ({
    ...state,
    conditions: state.conditions.map((c, i) =>
      i === index ? { ...c, field } : c
    ),
  })),

  on(SearchActions.setOperator, (state, { index, operator }) => ({
    ...state,
    conditions: state.conditions.map((c, i) =>
      i === index ? { ...c, operator } : c
    ),
  })),

  on(SearchActions.setKeyword, (state, { index, keyword }) => ({
    ...state,
    conditions: state.conditions.map((c, i) =>
      i === index ? { ...c, keyword } : c
    ),
  })),

  on(SearchActions.setLogicalOperator, (state, { index, operator }) => ({
    ...state,
    logicalOperator: state.logicalOperator.map((c, i) =>
      i === index ? operator : c
    ),
  })),

  on(SearchActions.submitSearch, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SearchActions.submitSearchSuccess, (state, { results }) => ({
    ...state,
    loading: false,
    results,
  })),
  on(SearchActions.submitSearchFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(SearchActions.clearSearch, () => initialState)
);
