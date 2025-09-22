import { createAction, props } from '@ngrx/store';
import { LogicalOp, SearchOperator, SearchTerm } from './search.models';

export const initWithOneRow = createAction('[Search] Init With One Row');

export const addRow = createAction('[Search] Add Row');
export const removeRow = createAction(
  '[Search] Remove Row',
  props<{ index: number }>()
);

export const setField = createAction(
  '[Search] Set Search Field',
  props<{ index: number; field: string }>()
);
export const setOperator = createAction(
  '[Search] Set Search Operator',
  props<{ index: number; operator: SearchOperator }>()
);
export const setKeyword = createAction(
  '[Search] Set Search Keyword',
  props<{ index: number; keyword: string | number }>()
);
export const setLogicalOperator = createAction(
  '[Search] Set Logical Operator',
  props<{ index: number; operator: LogicalOp }>()
);

export const submitSearch = createAction('[Search] Submit');
export const submitSearchSuccess = createAction(
  '[Search] Submit Success',
  props<{ results: any[] }>()
);
export const submitSearchFailure = createAction(
  '[Search] Submit Failure',
  props<{ error: string }>()
);
export const clearSearch = createAction('[Search] Clear');
