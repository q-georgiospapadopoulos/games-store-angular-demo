import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LogicalOp, SearchState, SearchTerm } from './search.models';

export const selectSearchState = createFeatureSelector<SearchState>('search');

export const selectConditions = createSelector(
  selectSearchState,
  (s) => s.conditions
);
export const selectLogicalOperators = createSelector(
  selectSearchState,
  (s) => s.logicalOperator
);
export const selectResults = createSelector(
  selectSearchState,
  (s) => s.results
);
export const selectLoading = createSelector(
  selectSearchState,
  (s) => s.loading
);
export const selectError = createSelector(selectSearchState, (s) => s.error);

// Factory selector for one row
export const selectConditionAt = (index: number) =>
  createSelector(selectConditions, (conds) => conds[index] ?? null);

// Build the exact payload your backend expects
export const selectBuiltQuery = createSelector(
  selectConditions,
  selectLogicalOperators,
  (conditions, logicalOperator) => {
    const valid = conditions.filter(
      (c) => c.field && c.operator && c.keyword !== null
    ) as SearchTerm[];
    return {
      conditions: valid.map((c) => ({
        field: c.field,
        operator: c.operator!,
        value: c.keyword,
      })),
      // If not chosen, send [] like your example; otherwise send the array
      logicalOperator: logicalOperator || [],
    };
  }
);
